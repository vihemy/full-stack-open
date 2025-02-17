import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      console.log('login complete')
    } catch (exception) {
      console.log('Wrong credentials');

    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog))
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  if (user === null){
    return (
      <div>
        <h2>log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> {user.name} logged in</p>
      <button onClick={handleLogout}>
          logout
        </button>
        <h2>create new</h2>

        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newAuthor={newAuthor}
          setNewAuthor={setNewAuthor}
          newUrl={newUrl}
          setNewUrl={setNewUrl}/>
        
      <h2>current blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App