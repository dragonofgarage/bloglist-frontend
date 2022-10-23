import { useState } from 'react'

const Blog = ({ blog, handleUpdateLikes, handleRemoveBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false)

  //inline style
  const blogBlock = {
    border:'2px solid black',
    paddingTop:'10px',
    marginBottom: '10px',
    width:'500px',
  }

  const showButtonStyle = {
    display: 'inline-block',
  }

  const blogListStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }




  const showWhenVisible = { display: showDetail? '' : 'none' }
  const showRemoveBtn = { display: blog.user[0].id  === user.id ? '' : 'none' }


  const handleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const updateLikes = () => {
    const newObject = {
      likes: blog.likes + 1
    }
    handleUpdateLikes(blog.id, newObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleRemoveBlog(blog.id)
    }
  }

  return(
    <div style={blogBlock} className='blog'>
      {blog.title}
      <div style={showButtonStyle}>
        {<button onClick={handleShowDetail}>{showDetail ? 'view' : 'hide'}</button>}
      </div>
      <div style={showWhenVisible} className='blogDetail'>
        <ul style={blogListStyle} >
          <li>{blog.url}</li>
          <li>likes: {blog.likes}<button onClick={updateLikes}>like</button></li>
          <li>{blog.author}</li>
        </ul>
        {<button
          style={showRemoveBtn}
          onClick={removeBlog}>
              remove
        </button>}
      </div>

    </div>
  )
}


export default Blog