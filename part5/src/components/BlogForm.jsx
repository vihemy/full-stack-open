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

const BlogForm = ({ addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl }) => {
  return (
    <form onSubmit={addBlog}>
      <InputField label='title' fieldContent={newTitle} setFieldContent={setNewTitle} />
      <InputField label='author' fieldContent={newAuthor} setFieldContent={setNewAuthor} />
      <InputField label='url' fieldContent={newUrl} setFieldContent={setNewUrl} />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;