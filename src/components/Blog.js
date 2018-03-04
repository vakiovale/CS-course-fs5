import React from 'react'

const Blog = ({ blog, handleClick, visibleStyle }) => (
  <div onClick={handleClick}>
    {blog.title} {blog.author}
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
      </p>
      <p>
        Added by: {blog.user !== undefined ? blog.user.username : 'unknown'}
      </p>
    </div>
  </div>
)

export default Blog