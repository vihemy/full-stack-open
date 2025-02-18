import { useState } from "react"

const BlogDetails = ({ blog }) => (
  <div>
    {blog.url}
    <div>
      likes {blog.likes} <button onClick={null}>like</button>
    </div>
    {blog.user.name}
  </div>
);

const Blog = ({ blog }) => {
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
      {showDetails && <BlogDetails blog={blog} />}
    </div>
  );
};

export default Blog