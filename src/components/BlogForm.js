import { useState } from 'react'

const InputForm = ({ name, value, handleProcess }) => (
  <div>
    {name}
    <input
      type = "text"
      value = {value}
      name = {name}
      onChange = {handleProcess}
     />
  </div>
)

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')



  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
        //user: user,
        title: blogTitle,
        url: blogUrl,
        author: author
      })
       
      setBlogTitle('')
      setAuthor('')
      setBlogUrl('')
    }

  return (
    <form onSubmit={addBlog}>
      <h1>Create New</h1>
      <InputForm
        name = "title"
        value = {blogTitle}
        handleProcess = {({ target }) => setBlogTitle(target.value)}
       />
      <InputForm
        name = "author"
        value = {author}
        handleProcess = {({ target }) => setAuthor(target.value)}
       />
      <InputForm
        name = "url"
        value = {blogUrl}
        handleProcess = {({ target }) => setBlogUrl(target.value)}
       />
      <button>create</button>
    </form>
  )}

export default BlogForm