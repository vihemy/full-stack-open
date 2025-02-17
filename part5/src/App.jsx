import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification";
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
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

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
    } catch (exception) {
      if (exception.response && exception.response.status === 401){
        notify('wrong username or password', 'red')
      } else {
        notify('an error occurred', 'red');
      }

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
    notify(`a new blog '${newTitle}' by ${newAuthor} added`, 'green')
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  function notify(message, color) {
    setNotification(message);
    setNotificationColor(color);
    setTimeout(() => setNotification(null), 5000);
  }

  if (user === null){
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification} color={notificationColor} />
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
      <Notification message={notification} color={notificationColor} />
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