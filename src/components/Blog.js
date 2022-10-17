import { useState } from "react"

const Blog = ({blog}) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogBlock = {
    border:'2px solid black',
    paddingTop:'10px',
    marginBottom: '10px',
    width:'500px',
  }

  const showButtonStyle = {
    display: 'inline-block',
  }

  const noneStyle = {
    display: 'none',
  }

  const blogListStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }


  const showWhenVisible = { display: showDetail? '' : 'none' }

  const handleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  return(
    <div style={blogBlock}>
      {blog.title}
        <div style={showButtonStyle}>
          {<button onClick={handleShowDetail}>{showDetail ? 'view' : 'hide'}</button>}
        </div>
        <div style={showWhenVisible}>
          <ul style={blogListStyle} >
            <li>{blog.url}</li>
            <li>{blog.likes}<button>like</button></li>
            <li>{blog.author}</li>
          </ul>
        </div>
       
    </div>  
  )
}


export default Blog