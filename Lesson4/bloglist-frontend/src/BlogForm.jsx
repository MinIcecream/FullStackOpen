import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setUrl('')
    setTitle('')
    
  }
  return (
    <form onSubmit = {addBlog}>
      <Form.Group>
        <div>
              title
          <Form.Control
            id = "title-input"
            type = "text"
            value = {title}
            data-testid='title'
            name = "Title"
            onChange = {({ target }) => {setTitle(target.value)}}
          />
        </div>
        <div>
              author
          <Form.Control
            id = "author-input"
            type = "text"
            value = {author}
            data-testid='author'
            name = "Author"
            onChange = {({ target }) => {setAuthor(target.value)}}
          />
        </div>
        url
        <div> 
          <Form.Control
            id = "url-input"
            type = "text"
            value = {url}
            data-testid='url'
            name = "Url"
            onChange = {({ target }) => {setUrl(target.value)}}
          />
        </div>
        <Button type = "submit">create</Button>
      </Form.Group>
       
    </form>
  )
}

export default BlogForm
