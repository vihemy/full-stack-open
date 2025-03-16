const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlogWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
          username: "Tiger",
          name: "Tigram Hamasalan",
          password: "abc123"
        }
      })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.locator('.login-form')).toBeVisible()
  })

  describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Tiger', "wrongpassword")
      const errorDiv = await page.locator('.notification')
      await expect(errorDiv).toContainText('wrong username or password')
      expect(page.getByText('Tigram Hamasalan logged in')).not.toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Tiger', "abc123")
      await expect(page.getByText('Tigram Hamasalan logged in')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Tiger', "abc123")
    })
  
    test('a new blog can be created', async ({ page }) => {
      createBlogWith(page, "This is a test", "Playwright", "www.testurl.com")
      const errorDiv = await page.locator('.notification')
      await expect(errorDiv).toContainText('a new blog "This is a test" by Playwright added')

      const blogDiv = await page.locator('.blog')
      await expect(blogDiv).toBeVisible()
      await expect(blogDiv).toContainText("Playwright")
      await expect(blogDiv).toContainText("This is a test")
    })
  })
})