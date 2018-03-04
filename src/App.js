import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

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
        <h2>Blogs</h2>
        <button onClick={this.logOut}>kirjaudu ulos</button>
        <p>{this.state.user.name} logged in</p>

        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            title 
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">tallenna</button>
        </form>

        <h2>Blogit</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
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
