import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';
import { expect, vi } from 'vitest';

test('blogForm calls eventhandler with correct details', async() => {
  const user = userEvent.setup();
  const createBlog = vi.fn();
  const notify = vi.fn();

  render(<BlogForm createBlog={createBlog} notify={notify} />);

  const titleInput = screen.getByPlaceholderText('title');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');

  const submitButton = screen.getByText('create');

  await user.type(titleInput, 'testing title input');
  await user.type(authorInput, 'testing author input');
  await user.type(urlInput, 'testing url input');

  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing title input');
  expect(createBlog.mock.calls[0][0].author).toBe('testing author input');
  expect(createBlog.mock.calls[0][0].url).toBe('testing url input');
});