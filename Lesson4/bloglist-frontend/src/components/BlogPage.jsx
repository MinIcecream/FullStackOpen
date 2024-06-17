import { useState } from 'react' 
import { removeBlog, updateBlog, addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux' 

const BlogPage = ({ blog, user }) => { 
  const dispatch = useDispatch() 
  const [comment, setComment] = useState("")
 
  const addLike = () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    dispatch(updateBlog(newBlog)) 
  }

  const createComment = (event) => {
    event.preventDefault() 
    const newBlog = {...blog, comments: blog.comments.concat(comment)}
    dispatch(addComment(newBlog))
    setComment('')
  }

  const handleInput = (event) => {
    setComment(event.target.value)
  }
  
    return( 
        <div> 
            <h2>{blog.title}</h2>
            {blog.url}
            <br></br>
            {blog.likes} likes <button onClick = {addLike}>like</button>
            <br></br>
            added by {blog.user.name} 

            <h4>comments</h4>
            <form onSubmit = {createComment}> 
              <input type = "text" value = {comment} onChange = {handleInput}/>
                <button type = "submit">add comment</button>
            </form>
            <ul> 
              {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
            </ul>
        </div>
    ) 
}
export default BlogPage