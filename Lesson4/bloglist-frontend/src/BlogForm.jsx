import { useState } from 'react'

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
      <div>
            title
        <input
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
        <input
          id = "author-input"
          type = "text"
          value = {author}
          data-testid='author'
          name = "Author"
          onChange = {({ target }) => {setAuthor(target.value)}}
        />
      </div>
      <div>
            url
        <input
          id = "url-input"
          type = "text"
          value = {url}
          data-testid='url'
          name = "Url"
          onChange = {({ target }) => {setUrl(target.value)}}
        />
      </div>
      <button type = "submit">create</button>
    </form>
  )
}

export default BlogForm
