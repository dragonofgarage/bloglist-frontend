import { render } from '@testing-library/react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const noteFormRef = useRef()        //for hideing form when create new


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //get token
  useEffect (() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessage(`${user.username} has logged in successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setError(true)
      setMessage(`wrong username or password`)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    noteFormRef.current.toggleVisibility()
    event.preventDefault()
    try {
      const newBlog = {
        //user: user,
        title: blogTitle,
        url: blogUrl,
        author: author
      }
      setBlogTitle('')
      setAuthor('')
      setBlogUrl('')

      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      
      setMessage(`${response.title} by ${user.username} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
  }}


  const loginForm = ( ) => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type = "text"
            value = {username}
            name = "username"
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type = "text"
            value = {password}
            name = "password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if(user === null || user === undefined ){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} isError = {error} />
        {loginForm()}
      </div>
    )
  }

  

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isError = {error}/>
      <p>{user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <AddBlogForm
          title = {blogTitle}
          handleCreateBlog = {handleCreateBlog}
          handleNewBlog = {({ target }) => setBlogTitle(target.value)}
          author = {author}
          handleAuthor = {({ target }) => setAuthor(target.value)}
          url = {blogUrl}
          handleUrl = {({ target }) => setBlogUrl(target.value)}
        />
      </Togglable>
        
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
