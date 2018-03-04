import React from 'react'

const Blog = ({ blog, handleClick, handleLike, handleDelete, visibleStyle, deleteVisible }) => (
  <div>
    <div className='blogHeader' onClick={handleClick}>
      {blog.title} {blog.author}
    </div>
    <div className='blogContent' style={visibleStyle} className="blogPost">
      <p>
        Author: {blog.author}
      </p>
      <p>
        Title: {blog.title}
      </p>
      <p>
        Url: {blog.url}
      </p>
      <p>
        Likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </p>
      <p>
        Added by: {blog.user !== undefined ? blog.user.username : 'unknown'}
      </p>
      <p style={deleteVisible}>
        <button onClick={handleDelete}>poista</button>
      </p>
    </div>
  </div>
)

export default Blog