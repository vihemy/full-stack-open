import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogDetails = ({ blog, handleLike, handleRemove, user }) => {
  const showRemove = blog.user.username === user.username;

  return (
    <div data-testid="blog-details">
      <p>{blog.url}</p>
      <p> likes
        <span data-testid="like-count">{blog.likes}</span>
        <button onClick={() => handleLike(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })}>like</button>
      </p>
      <p>
        {blog.user.name}
        {showRemove && <button onClick={() => handleRemove(blog)}>remove</button>}
      </p>
    </div>
  );
};

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const blogStyle = {
    border: '1px solid black',
    marginBottom: '5px'
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle} className='blog' data-testid='blog-post'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && <BlogDetails
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        user={user}/>}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;