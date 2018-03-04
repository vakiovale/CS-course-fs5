import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      showAll: true,
      username: '',
      password: '',
      author: '',
      title: '',
      url: '',
      notification: null,
      loginVisible: null,
      visible: null,
      blogVisible: null,
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }

  }

  addNotification = (message) => {
    this.setState({
      notification: message
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token) 
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.addNotification('Väärä käyttäjätunnus tai salasana')
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: this.state.author,
      title: this.state.title,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog)
        })
        this.addNotification('New blog added!')
      })
  }

  logOut = () => {
    console.log('Logging out')
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  showBlogPost = (id) => {
    return () => {
      console.log(id)
      if(this.state.blogVisible !== null && this.state.blogVisible === id) {
        console.log('Hiding')
        this.setState({ blogVisible: null })
      } else {
        console.log('Showing')
        this.setState({ blogVisible: id })
      }
    }
  }

  render() {

    const loginForm = () => {
      return (
        <Togglable buttonLabel="kirjaudu">
          <LoginForm
            visible={this.state.visible}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleFieldChange}
            handleSubmit={this.login}
          />
        </Togglable>
      )
    }

    const blogs = () => (
      <div>
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.logOut}>kirjaudu ulos</button>

        <Togglable buttonLabel="Luo blogi">
          <BlogForm addBlog={this.addBlog} author={this.state.author} 
            title={this.state.title} url={this.state.url}
            handleChange={this.handleFieldChange} />
        </Togglable>

        <h2>Blogit</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog} 
            handleClick={this.showBlogPost(blog._id)}
            visibleStyle={{ display: this.state.blogVisible !== null && this.state.blogVisible === blog._id ? '' : 'none' }} />
        )}
      </div>
    )

    return (
      <div>
        <Notification message={this.state.notification} />
        {this.state.user === null ?
          loginForm() :
          blogs()
        }
      </div>
    )
  }
}

export default App
