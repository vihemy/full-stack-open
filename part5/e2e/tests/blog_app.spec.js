const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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
})