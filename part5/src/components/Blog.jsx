import { useState } from "react"
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, handleLike, handleRemove, user }) => {
  const showRemove = blog.user.username === user.username
  
  return (
  <div>
    {blog.url}
    <div>
      likes {blog.likes} <button onClick={() => handleLike(blog.id, {...blog, likes: blog.likes + 1, user: blog.user.id})}>like</button>
    </div>
    {blog.user.name}
    {showRemove && <button onClick={() => handleRemove(blog)}>remove</button>}
  </div>
  )
};

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const blogStyle = {
    border: '1px solid black',
    marginBottom: '5px'
  }

  const [showDetails, setShowDetails] = useState(false);

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle}>
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
}

export default Blog