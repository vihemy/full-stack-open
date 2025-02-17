import { useState } from 'react'

const InputField = ({ label, fieldContent, setFieldContent }) => {
  return (
    <div>
      {label}:
      <input
        type="text"
        value={fieldContent}
        onChange={({ target }) => setFieldContent(target.value)}
      />
    </div>
  );
};

const BlogForm = ({ createBlog, notify }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    notify(`a new blog '${newTitle}' by ${newAuthor} added`, 'green')
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }
  
  return (
    <div>
      <h2>new blog</h2>
      <form onSubmit={addBlog}>
        <InputField label='title' fieldContent={newTitle} setFieldContent={setNewTitle} />
        <InputField label='author' fieldContent={newAuthor} setFieldContent={setNewAuthor} />
        <InputField label='url' fieldContent={newUrl} setFieldContent={setNewUrl} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;