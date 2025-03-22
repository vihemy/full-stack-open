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

const uiLogin = async (page, username, password)  => {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const apiLogin = async (request, username, password) => {
  const response = await request.post('/api/login', {
    data: { username, password },
  });

  // console.log('Login response:', response); // Debugging

  const responseBody = await response.body(); // Await the body
  const parsedBody = JSON.parse(responseBody.toString()); // Parse the JSON response

  // console.log('Response body:', parsedBody); // Debugging
  console.log(parsedBody.token);

  return parsedBody.token;
};

const apiCreateBlog = async (request, title, author, url, likes, token) => {
  await request.post('/api/blogs', {
    data: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const uiCreateBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click();
  await page.getByTestId('title').fill(title);
  await page.getByTestId('author').fill(author);
  await page.getByTestId('url').fill(url);
  await page.getByRole('button', { name: 'create' }).click();
  await page.locator('div[data-testid="blog-post"]', { hasText: title }).waitFor();
};

export { resetDatabase, createUser, uiLogin, uiCreateBlog, apiLogin, apiCreateBlog };