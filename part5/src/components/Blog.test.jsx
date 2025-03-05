import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'test6',
    author: '12345678',
    url: 'www.test.dk',
    likes: 8
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent('test6');
});
