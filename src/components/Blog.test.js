import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('renders blog', () => {
    const blog = {
      author: 'Author',
      title: 'Title',
      url: 'urli'
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const headerDiv = blogComponent.find('.blogHeader')

    expect(headerDiv.text()).toContain(blog.author)
  })
})
