import { useState } from "react"

const BlogDetails = ({ blog, handleLike }) => {
  return (
  <div>
    {blog.url}
    <div>
      likes {blog.likes} <button onClick={() => handleLike(blog.id, {...blog, likes: blog.likes + 1, user: blog.user.id})}>like</button>
    </div>
    {blog.user.name}
  </div>
  )
};

const Blog = ({ blog, handleLike }) => {
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
      {showDetails && <BlogDetails blog={blog} handleLike={handleLike} />}
    </div>
  );
};

export default Blog