import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { expect, test } from 'vitest';

const blog = {
  title: 'test6',
  author: '12345678',
  url: 'www.test.dk',
  likes: 8,
  user: {
    username: "Tiger",
    name: "Tigram Hamasalan"
  }
};

const userObject = {
  username: "Tiger",
  name: "Tigram Hamasalan"
};

test('renders title & author, not url & likes', () => {
  const { container } = render(<Blog blog={blog} />);

  const blogDiv = container.querySelector('.blog');
  expect(blogDiv).toHaveTextContent('test6');
  expect(blogDiv).toHaveTextContent('12345678');
  expect(blogDiv).not.toHaveTextContent('www.test.dk');
  expect(blogDiv).not.toHaveTextContent('likes 8');
});

test('url & likes are shown when "view"-button is pressed', async () => {
  const { container } = render(<Blog blog={blog} user={userObject} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const blogDiv = container.querySelector('.blog');
  expect(blogDiv).toHaveTextContent('www.test.dk');
  expect(blogDiv).toHaveTextContent('likes 8');
});