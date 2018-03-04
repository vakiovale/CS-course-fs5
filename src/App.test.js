import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders all blogs it gets from backend', () => {
    app.update()
    const form = app.find(LoginForm)
    const blogs = app.find(Blog)
    expect(form.text()).toContain('kirjaudu')
    expect(blogs.length).toEqual(0)
  })
})
