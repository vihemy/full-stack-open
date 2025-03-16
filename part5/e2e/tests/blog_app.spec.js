const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlogWith } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'Tiger',
        name: 'Tigram Hamasalan',
        password: 'abc123'
      }
    });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible();
    await expect(page.locator('.login-form')).toBeVisible();
  });

  describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Tiger', 'wrongpassword');
      const errorDiv = await page.locator('.notification');
      await expect(errorDiv).toContainText('wrong username or password');
      expect(page.getByText('Tigram Hamasalan logged in')).not.toBeVisible();
    });

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Tiger', 'abc123');
      await expect(page.getByText('Tigram Hamasalan logged in')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Tiger', 'abc123');
      await createBlogWith(page, 'This is a test', 'Playwright', 'www.testurl.com');
    });

    test('a new blog can be created', async ({ page }) => {
      const errorDiv = await page.locator('.notification');
      await expect(errorDiv).toContainText('a new blog "This is a test" by Playwright added');

      const blogDiv = await page.locator('.blog');
      await expect(blogDiv).toBeVisible();
      await expect(blogDiv).toContainText('Playwright');
      await expect(blogDiv).toContainText('This is a test');
    });

    test('a newly created blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click();
      const blogDetails = await page.getByTestId('blogDetails');
      await expect(blogDetails).toContainText('likes 0');
      await page.getByRole('button', { name: 'like' }).click();
      await expect(blogDetails).toContainText('likes 1');
    });

    test('blog is removable by creator', async ({ page }) => {
      const blogPost = await page.getByTestId('blogPost');
      await blogPost.getByRole('button', { name: 'view' }).click();
      await expect(blogPost).toContainText('remove');
      page.on('dialog', dialog => dialog.accept());
      await blogPost.getByRole('button', { name: 'remove' }).click();

      await expect(blogPost).toHaveCount(0);
    });

    test('only creator can remove a blog', async ({ request, page }) => {
      await request.post('/api/users', {
        data: {
          username: 'Gazelle',
          name: 'Gaia Gibbernakker',
          password: 'def456'
        }
      });

      await page.getByRole('button', { name: 'logout' }).click();
      await loginWith(page, 'Gazelle', 'def456');

      const blogPost = await page.getByTestId('blogPost');
      await blogPost.getByRole('button', { name: 'view' }).click();
      await expect(blogPost).not.toContainText('remove');
    });
  });
});