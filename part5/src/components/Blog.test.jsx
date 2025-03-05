import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders title & author, not url & likes', () => {
  const blog = {
    title: 'test6',
    author: '12345678',
    url: 'www.test.dk',
    likes: 8
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent('test6');
  expect(div).toHaveTextContent('12345678');
  expect(div).not.toHaveTextContent('www.test.dk');
  expect(div).not.toHaveTextContent('likes: 8');
});
