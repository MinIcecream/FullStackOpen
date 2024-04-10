const {test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('assert')
const api = supertest(app)
const helper = require('../utils/test_helper')

describe('when there are initally some blogs saved', () => {
	
	beforeEach(async () => {
		await Blog.deleteMany({})

		await Blog.insertMany(helper.initialBlogs)
	})

	test('get returns correct number of blogs', async() => {
		const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/).expect(200)
		assert.strictEqual(response.body.length, helper.initialBlogs.length)
	})
	
	test('blogs contain id property', async() => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => { 
			assert('id' in blog)
		})
	})
	
	describe('viewing a specific blog', () => {

		test('succeeds with a valid id', async() => {
			const blogsAtStart = await helper.blogsInDb()

			const blogToView = blogsAtStart[0]

			const resultBlog = await api.get(`/api/blogs/${blogToView.id}`).expect(200).expect('Content-Type', /application\/json/)

			assert.deepStrictEqual(resultBlog.body, blogToView)
		})

		test('fails with statuscode 400 if invalid id', async () => {
			const invalidId = await helper.nonExistingId()  
			await api.get(`/api/blogs/${invalidId}`).expect(400)
		})
	})
	
	describe('addition of a new blog', () => {

		test('valid blogs can be added', async() => {
			const newBlog = {
				title: 'test blog',
				author: 'test author',
				url: 'test URL',
				likes: 10,
			}
		
			let response = await api.get('/api/blogs')  
			await api.post('/api/blogs').send(newBlog)
		
			response = await api.get('/api/blogs') 
		
			const contents = response.body.map(r => r.title) 
		
			assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
		
			assert(contents.includes('test blog'))
		})

		test('empty likes defaults to 0', async() => {
			const newBlog = {
				title: 'test blog',
				author: 'test author',
				url: 'test URL', 
			}
		
			const response = await api.post('/api/blogs').send(newBlog)
		
			assert.strictEqual(response.body.likes, 0) 
		}) 
		
		test('title cannot be empty', async() => {
			const newBlog = { 
				author: 'test author',
				url: 'test URL',
				likes: 1 
			}
		
			await api.post('/api/blogs').send(newBlog).expect(400)
		})
		test('url cannot be empty', async() => {
			const newBlog = { 
				title: 'test title',
				author: 'test author', 
				likes: 1 
			}
		
			await api.post('/api/blogs').send(newBlog).expect(400)
		})
		test('both cannot be empty', async() => {
			const newBlog = { 
				author: 'test author', 
				likes: 1 
			}
		
			await api.post('/api/blogs').send(newBlog).expect(400)
		})
	})
	
	describe('deletion of a blog', () => {
		test('succeeds with status code 204 if id is valid', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const blogToDelete = blogsAtStart[0]

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.expect(204)

			const blogsAtEnd = await helper.blogsInDb()

			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1) 
			const contents = blogsAtEnd.map(r => r.title) 
			assert(!contents.includes(blogToDelete.title))
		})
	})

	describe('updating a blog', () => {
		test('succeeds with status code 204 if id is valid', async () => { 
			const blogsAtStart = await helper.blogsInDb()
			const blogToUpdate = blogsAtStart[0]
			const newBlog = {...blogToUpdate, likes: 200}

			await api
				.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)
				.expect(200)

			const blogsAtEnd = await helper.blogsInDb()
  
			blogsAtEnd.forEach(blog => {
				if (blog.title == blogToUpdate.title) {
					assert.strictEqual(blog.likes, 200)
				}
			})
		}) 
	})
})
 

after(async () => {
	await mongoose.connection.close()
})

 