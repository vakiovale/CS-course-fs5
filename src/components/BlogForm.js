import React from 'react'

const BlogForm = ({ addBlog, author, title, url, handleChange }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <form onSubmit={addBlog}>
        <div>
        author
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
        title 
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
        url
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}
export default BlogForm