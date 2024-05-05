const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Daniel Zhang',
            username: 'miniicecream',
            password: '1234'
        }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log into application')
    await expect(locator).toBeVisible
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {   
        await loginWith(page, 'miniicecream', '1234')
      
        await expect(page.getByText('Daniel Zhang logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => { 
        await loginWith(page, 'miniicecream', 'wrong')
      
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials!')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      
        await expect(page.getByText('Daniel Zhang logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'miniicecream', '1234')
    })
  
    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'test title')
        await expect(page.getByText('test title by test author')).toBeVisible()
    })

    describe('and several blogs exist', () => {
        beforeEach(async ({ page }) => {
            await createBlog(page, 'test title')
            await createBlog(page, 'test title 2')
        })
        test.only('can like a blog', async({page}) => {
            const blog = await page.getByText('test title')
            await blog.getByRole('button', {name: 'like'}).click()
            await expect(blog.getByText('likes 1')).toBeVisible()
        })
    })
  })
})