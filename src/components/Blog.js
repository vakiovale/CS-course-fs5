import React from 'react'

const Blog = ({ blog, handleClick, handleLike, visibleStyle }) => (
  <div>
    <div onClick={handleClick}>
      {blog.title} {blog.author}
    </div>
    <div style={visibleStyle} className="blogPost">
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
    </div>
  </div>
)

export default Blog