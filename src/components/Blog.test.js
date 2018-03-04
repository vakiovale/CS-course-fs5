import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog'

describe.only('<Blog />', () => {
  it('renders blog', () => {
    const blog = {
      author: 'Author',
      title: 'Title',
      url: 'urli',
      likes: 42
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const headerDiv = blogComponent.find('.blogHeader')

    expect(headerDiv.text()).toContain(blog.author)
  })
})

describe.only('<SimpleBlog />', () => {
  it('renders simple blog', () => {
    const blog = {
      author: 'Author',
      title: 'Title',
      url: 'urli',
      likes: 42
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const headerDiv = blogComponent.find('.blogHeader')
    const contentDiv = blogComponent.find('.content')

    expect(headerDiv.text()).toContain(blog.author)
    expect(headerDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain('blog has 42 likes')
  })
})