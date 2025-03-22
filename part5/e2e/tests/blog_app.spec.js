const { test, expect, beforeEach, describe } = require('@playwright/test');
const { uiLogin, uiCreateBlog, resetDatabase, createUser, apiCreateBlog, apiLogin } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await resetDatabase(request);
    await createUser(request, 'Tiger', 'Tigram Hamasalan', 'abc123');
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible();
    await expect(page.locator('.login-form')).toBeVisible();
  });

  describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
      await uiLogin(page, 'Tiger', 'wrongpassword');
      const errorDiv = await page.locator('.notification');
      await expect(errorDiv).toContainText('wrong username or password');
      expect(page.getByText('Tigram Hamasalan logged in')).not.toBeVisible();
    });

    test('succeeds with correct credentials', async ({ page }) => {
      await uiLogin(page, 'Tiger', 'abc123');
      await expect(page.getByText('Tigram Hamasalan logged in')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await uiLogin(page, 'Tiger', 'abc123');
      await uiCreateBlog(page, 'This is a test', 'Playwright', 'www.testurl.com');
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
      const blogDetails = await page.getByTestId('blog-details');
      await expect(blogDetails).toContainText('likes 0');
      await page.getByRole('button', { name: 'like' }).click();
      await expect(blogDetails).toContainText('likes 1');
    });

    test('blog is removable by creator', async ({ page }) => {
      const blogPost = await page.getByTestId('blog-post');
      await blogPost.getByRole('button', { name: 'view' }).click();
      await expect(blogPost).toContainText('remove');
      page.on('dialog', dialog => dialog.accept());
      await blogPost.getByRole('button', { name: 'remove' }).click();

      await expect(blogPost).toHaveCount(0);
    });

    test('only creator can remove a blog', async ({ request, page }) => {
      await createUser(request, 'Gazelle', 'Gaia Gibbernakker', 'def456');

      await page.getByRole('button', { name: 'logout' }).click();
      await uiLogin(page, 'Gazelle', 'def456');

      const blogPost = await page.getByTestId('blog-post');
      await blogPost.getByRole('button', { name: 'view' }).click();
      await expect(blogPost).not.toContainText('remove');
    });

  });
  test.only('blogs are arranged in descending order according to likes', async ({ page, request }) => {
    const token = await apiLogin(request, 'Tiger', 'abc123');

    await apiCreateBlog(request, 'This is a test', 'Playwright', 'www.testurl.com', 5, token);
    await apiCreateBlog(request, 'This is a second test', 'Selenium', 'www.google.com', 2, token);
    await apiCreateBlog(request, 'This is a third test', 'Cypress', 'www.bing.com', 9, token);

    await page.goto('/');
    await uiLogin(page, 'Tiger', 'abc123');
    await expect(page.getByText('Tigram Hamasalan logged in')).toBeVisible();

    const blogs = await page.getByTestId('blog-post').all();

    for (const blog of blogs) {
      await blog.getByRole('button', { name: 'view' }).click();
    }

    const likeCounts = await Promise.all(
      blogs.map(async (blog) => {
        const text = await blog.getByTestId('like-count').innerText();
        return parseInt(text, 10);
      })
    );

    expect(likeCounts).toEqual([...likeCounts].sort((a, b) => b - a));
  });
});