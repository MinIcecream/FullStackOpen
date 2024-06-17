import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './Notification'
import Error from './Error'
import { useDispatch, useSelector } from 'react-redux' 
import { setNotification } from './reducers/notificationReducer'
import { setError } from './reducers/errorReducer'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import {Link, Route, Routes, useMatch, useNavigate} from "react-router-dom"
import UsersPage from './components/UsersPage'
import User from './components/User'
import userService from './services/users' 
import SingleBlogPage from './components/BlogPage'
import {Nav, Navbar, Table} from 'react-bootstrap'
const App = () => { 
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([]) 
  const [users, setUsers] = useState([])
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)
  const dispatch = useDispatch() 
 
  useEffect(() => {
    dispatch(initializeBlogs())
  }, []) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser') 
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedInUser)) 
    }
  }, [])

  useEffect(() => { 
      const fetchUsers = async () => {
        const allUsers = await userService.getAll()
        setUsers(allUsers)
      }
      fetchUsers()
    }, [])
   
  const match = useMatch('/users/:id') 
  const routeUser = match
    ? users.find(user => user.id === match.params.id)
    : null    

  const blogMatch = useMatch('/blogs/:id') 
  const routeBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null     
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password,
      })
 
      dispatch(setUser(user))
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
    dispatch(removeUser())
  }
  const createBlog = async(blog) => {
    blogFormRef.current.toggleVisibility()
    try{ 
      await dispatch(addBlog(blog))
      dispatch(setNotification("you created a blog", 5000)) 
    }
    catch(error){
      dispatch(setError("Error adding blog", 5000)) 
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
    <> 
      <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
        <BlogForm createBlog = {createBlog} />
      </Togglable>
    </> 
  )

  const blogList = () => { 
    return(
    <> 
      <Table striped>
        <tbody> 
          {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog => {
            return <tr key = {blog.id}><td><Blog likeBlog = {likeBlog} key={blog.id} blog={blog} user = {user} deleteBlog = {deleteBlog}/></td></tr> 
          })}
        </tbody>
      </Table>
    </>
    ) 
  }

  const BlogPage = () => {
    return (
      <div>
        {blogForm()}
        {blogList()} 
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <Error />

        <h2>Log into application</h2>
        {loginForm()}
      </div>
    )
  } 
    
  return (
    <div>
      <Notification/>
      <Error /> 
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse aria-controls="responsive-navbar-nav"> 
          <Nav className = "me-auto">
            <Nav.Link href = "#" as = "span">
              <Link to = '/'>blogs</Link>   
            </Nav.Link>
            <Nav.Link href = "#" as = "span">
              <Link to = '/users'>users</Link>
            </Nav.Link>
            <Nav.Item>
              <Nav.Link as = "span"> 
                <button onClick = {handleLogout}>logout</button>  
              </Nav.Link> 

            </Nav.Item> 

            <Nav.Item>
              <Nav.Link as="span" className="text-white">
                <em>{user.name} logged in</em>
              </Nav.Link>
            </Nav.Item>
          </Nav>  
        </Navbar.Collapse>
      </Navbar>

      <div className='container'> 
        <h2>blog app</h2>  
        <Routes>
          <Route path = "/" element = {<BlogPage />} />
          <Route path = "/users" element = {<UsersPage />} /> 
          <Route path = "/users/:id" element = {<User user = {routeUser} />} />
          <Route path = "/blogs/:id" element = {<SingleBlogPage blog = {routeBlog} />} />
        </Routes>  
      </div>
 
    </div>
  )
}

export default App