const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let newState = {
    good: state.good,
    ok: state.ok,
    bad: state.bad
  }
  switch (action.type) {
  case 'GOOD':
    newState.good = newState.good + 1
    return newState
  case 'OK':
    newState.ok = newState.ok + 1
    return newState
  case 'BAD':
    newState.bad = newState.bad + 1
    return newState
  case 'NOLLAA':
    return { good: 0, ok: 0, bad: 0 }
  default:
    return state
  }
}

export default counterReducer