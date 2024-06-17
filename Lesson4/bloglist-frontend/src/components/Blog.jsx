import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {   
  return (
    <div className = 'blog'>  
        <Link to = {`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
    </div>
  )}
export default Blog