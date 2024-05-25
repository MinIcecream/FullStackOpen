 import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('does not render all information by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test url',
    likes: 0,
  }

  const { container } = render(<Blog blog = {blog} />)

  const element = container.querySelector('.blog')
  expect(element).toBeDefined()
  expect(element.textContent).toContain('Test Blog')
  expect(element.textContent).toContain('Test Author')
  expect(element.textContent).not.toContain('0')
  expect(element.textContent).not.toContain('test url')
})

test('renders all information after show button is clicked', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test url',
    likes: 0,
    user: { name: 'Test user' }
  }

  const { container } = render(<Blog blog = {blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const element = container.querySelector('.blog')

  expect(element.textContent).toContain('Test Blog')
  expect(element.textContent).toContain('Test Author')
  expect(element.textContent).toContain('0')
  expect(element.textContent).toContain('test url')
  expect(element.textContent).toContain('Test user')
})
test('event handler works for liking blogs', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'test url',
      likes: 0,
      user: { name: 'Test user' }
    }
   
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog = {blog} likeBlog = {mockHandler} />)

    const button = screen.getByText('view')

    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    const element = container.querySelector('.blog')

    expect(mockHandler.mock.calls).toHaveLength(2)
    
  })