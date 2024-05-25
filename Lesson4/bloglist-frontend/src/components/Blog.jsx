import { useState } from 'react' 

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    likeBlog(blog)
    setLikes(likes + 1)
  }

  if (showDetails === true) {
    return(
      <div style={blogStyle} className = 'blog'>
        <div>
          <div>{blog.title} {blog.author} <button onClick = {toggleVisibility}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick = {addLike}>like</button></div>
          <div>{ blog.user ? blog.user.name : "no user"}</div> 
          {blog.user?.name === user.name ? <button onClick = {() => deleteBlog(blog)}>delete</button> : null}
        </div>
      </div>
    )
  }


  return (
    <div style={blogStyle} className = 'blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick = {toggleVisibility}>view</button>
      </div>
    </div>
  )}
export default Blog