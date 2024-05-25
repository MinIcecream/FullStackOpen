import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './Notification'
import Error from './Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setError('Wrong credentials!')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const createBlog = async(blog) => {
    blogFormRef.current.toggleVisibility()
    try{
      await blogService.create(blog).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
      setNotification(`${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch(error){
      setError('Error adding blog!')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const deleteBlog = async(blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    } 
    await blogService.remove(blog)

    setBlogs(prevList => {
      const updatedList = prevList.filter(obj => obj.id !== blog.id)
      return updatedList
    })
  }

  const likeBlog = async(blog) => {
    const newLikes = blog.likes + 1
    blog.likes = newLikes

    await blogService.update(blog)
    setBlogs(prevList => {
      const index = prevList.findIndex(obj => obj.id === blog.id)

      if (index !== -1) {
        const updatedList = [...prevList]
        updatedList[index] = { ...updatedList[index], likes: newLikes }
        return updatedList
      }
      else {
        console.log('blog not found')
        return prevList
      }
    })
  }


  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input
          type = "text"
          value = {username}
          name = "Username"
          data-testid='username'
          onChange = {({ target }) => {setUsername(target.value)}}
        />
      </div>
      <div>
        password
        <input
          type = "text"
          value = {password}
          name = "Password"
          data-testid='password'
          onChange = {({ target }) => {setPassword(target.value)}}
        />
      </div>
      <button type = "submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
      <BlogForm createBlog = {createBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification message = {notification}/>
        <Error message = {error}/>

        <h2>Log into application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message = {notification}/>
      <Error message = {error}/>

      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick = {handleLogout}>logout</button></p>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return <Blog likeBlog = {likeBlog} key={blog.id} blog={blog} user = {user} deleteBlog = {deleteBlog}/>
      }
      )}

      <h2>create new</h2>
      {blogForm()}
    </div>
  )
}

export default App