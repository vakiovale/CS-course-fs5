import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './counterReducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)

const Statistiikka = ({ nollaaja }) => {
  const state = store.getState()

  if (state.good === 0 && state.ok === 0 && state.bad === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(state.good - state.bad)/(state.good + state.ok + state.bad)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{state.good + state.ok}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={nollaaja()}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    console.log(nappi)
    store.dispatch({ type: nappi })
  }

  nollaaja = () => {
    return () => {
      store.dispatch({ type: 'NOLLAA' })
      console.log('nollaa')
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka nollaaja={this.nollaaja} />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)