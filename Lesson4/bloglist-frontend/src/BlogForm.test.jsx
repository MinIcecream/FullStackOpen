/*
Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.
*/
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('renders all information after show button is clicked', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
 
    const { container } = render(<BlogForm createBlog = {createBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const button = screen.getByText('create')

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test author')
    await user.type(urlInput, 'Test url')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test author')
    expect(createBlog.mock.calls[0][0].url).toBe('Test url')
  })