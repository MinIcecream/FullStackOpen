const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	let sum = 0
	blogs.forEach(blog => sum += blog.likes) 
	return sum
}

const favoriteBlog = (blogs) => {
	let mostLikes = 0
	let bestBlog = {}

	blogs.forEach(blog => {
		if (blog.likes > mostLikes)
		{
			bestBlog = {
				title: blog.title,
				author: blog.author,
				likes: blog.likes
			}
			mostLikes = blog.likes
		}
	})

	return bestBlog
}

const mostBlogs = (blogs) => { 
	const authorBlogCounts = {} //author: blogs 

	blogs.forEach(blog => {
		if (blog.author in authorBlogCounts){
			authorBlogCounts[blog.author] += 1
		} 
		else{
			authorBlogCounts[blog.author] = 1
		}
	})

	let highestValue = 0
	let highestKey = ''

	for (const [key, value] of Object.entries(authorBlogCounts)) {
		if (value > highestValue) {
			highestValue = value
			highestKey = key
		}
	} 

	return {author: highestKey, blogs: highestValue}
}

const mostLikes = (blogs) => { 
	const authorLikeCounts = {} //author: blogs 

	blogs.forEach(blog => {
		if (blog.author in authorLikeCounts){
			authorLikeCounts[blog.author] += blog.likes
		} 
		else{
			authorLikeCounts[blog.author] = blog.likes
		}
	})

	let highestValue = 0
	let highestKey = ''

	for (const [key, value] of Object.entries(authorLikeCounts)) {
		if (value > highestValue) {
			highestValue = value
			highestKey = key
		}
	} 

	return {author: highestKey, likes: highestValue}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}