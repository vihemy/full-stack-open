import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification";
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");
  const blogFormRef = useRef()

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog))
  }

  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject);
    setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
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
      {user.name} logged in
      <button onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
        createBlog={addBlog}
        notify={notify}/>
      </Togglable>
      <h2>current blogs</h2>
      {blogs.map(blog =>
        <Blog
        key={blog.id}
        blog={blog}
        handleLike={updateBlog} />
      )}
    </div>
  )
}

export default App