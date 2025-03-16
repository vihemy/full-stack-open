const resetDatabase = async (request) => {
  await request.post('/api/testing/reset');
};

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', {
    data: {
      username,
      name,
      password
    }
  });
};

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlogWith = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click();
  await page.getByTestId('title').fill(title);
  await page.getByTestId('author').fill(author);
  await page.getByTestId('url').fill(url);
  await page.getByRole('button', { name: 'create' }).click();
};

export { resetDatabase, createUser, loginWith, createBlogWith };