const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')  
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', 'username name id')
	response.json(blogs) 
})
blogsRouter.get('/:id', async (request, response) => {  
	const blog = await Blog.findById(request.params.id)

	if (blog){
		response.json(blog)
	}
	else{
		response.status(400).end()
	} 
})
blogsRouter.post('/', middleware.userExtractor, async (request, response) => { 
	const blog = new Blog(request.body)  
	const decodedToken = jwt.verify(request.token, config.SECRET)  
	if (!decodedToken.id){ 
		return response.status(401).json({error: 'token invalid'})
	} 
	const blogUser = await User.findById(decodedToken.id)
 
	blog.user = blogUser  
 
	const result = await blog.save()  
	blogUser.blogs = blogUser.blogs.concat(result._id) 
	await blogUser.save() 

	response.status(201).json(result) 
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const blogToDelete = await Blog.findById(request.params.id)
	const decodedToken = jwt.verify(request.token, config.SECRET)
	if (!decodedToken.id){
		return response.status(401).json({error: 'token invalid'})
	}
	const user = await User.findById(decodedToken.id)

	if (blogToDelete.user.toString() === user.id.toString())
	{
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end() 
	} 
	else{
		response.status(401).end()
	}
})
  
blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
	const body = request.body
	
	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes 
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true, runValidators: true, context: 'query'})
	response.json(updatedBlog)
})
module.exports = blogsRouter
 