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

const AddBlogForm = ({handleCreateBlog, title, handleNewBlog, author, handleAuthor, url, handleUrl}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <h1>Create New</h1>
      <InputForm
        name = "title"
        value = {title}
        handleProcess = {handleNewBlog}
       />
      <InputForm
        name = "author"
        value = {author}
        handleProcess = {handleAuthor}
       />
      <InputForm
        name = "url"
        value = {url}
        handleProcess = {handleUrl}
       />
      <button>create</button>
    </form>
  )}

export default AddBlogForm