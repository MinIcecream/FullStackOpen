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
    await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Bob Randall',
            username: 'bigBob',
            password: 'secret'
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
            await page.waitForTimeout(500)
            await createBlog(page, 'test title 2')
        })
        test('can like a blog', async({page}) => {
            const blog = await page.getByText('test title test author') 
            await blog.getByRole('button', {name: 'view'}).click() 
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes 1')).toBeVisible()
        }) 
        test('creator can delete a blog', async({page}) => {
          page.on('dialog', dialog => dialog.accept());
          await page.waitForTimeout(500)
            const blog = await page.getByText('test title test author') 
            await page.waitForTimeout(100)
            await blog.getByRole('button', {name: 'view'}).click() 
            await page.waitForTimeout(100)
            await page.getByRole('button', {name: 'delete'}).click()
            await expect(page.getByText('test title test author')).not.toBeVisible()
        }) 
        test('non creator cannot delete a blog', async({page}) => { 
            await page.getByRole('button', {name: 'logout'}).click() 
            await loginWith(page, 'bigBob', 'secret')
            await page.waitForTimeout(500)
            const blog = await page.getByText('test title test author') 
            await page.waitForTimeout(500)
            await blog.getByRole('button', {name: 'view'}).click()  
            await expect(page.getByText('delete')).not.toBeVisible()
        }) 
        test('blogs are ordered by likes', async({page}) => {  
          await page.waitForTimeout(500)
          const blog = await page.getByText('test title test author') 
          const blog2 = await page.getByText('test title 2 test author') 
          await blog2.getByRole('button', {name: 'view'}).click()  
          await page.getByRole('button', {name: 'like'}).click() 
          const blog1Y = await blog.boundingBox.y
          const blog2Y = await blog2.boundingBox.y
          expect(blog2Y > blog1Y)
      }) 
    })
  })
})