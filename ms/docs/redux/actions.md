---
layout: _layouts/chapter.jade
book: Redux
chapter: Actions
---

# Actions

So far we've learned about actions: things you `dispatch()` to a store to change its state.

```js
store.dispatch({ type: 'PUBLISH' })
```

Actions are objects and always have a `type` key. This isn't required, but it's just the way everyone does it.

> How would we do it asynchronously? [Continue >](#next)

---

# The three states

Processes are *asynchronous* when they take a long time, such as AJAX calls to load some data. They usually have 3 states: `pending`, `success`, and `error`. Imagine it looking like this:

```js
store.dispatch({ type: 'LOAD_START' })
API.get('/data.json')
  .then(data =>
    store.dispatch({ type: 'LOAD_FINISH', data: data }))
  .catch(error =>
    store.dispatch({ type: 'LOAD_ERROR', error: error }))
```

> ↳ Assuming `API.get()` returns a promise, we can use it to trigger store actions when something happens.

&nbsp;

> Let's try to hook this up to our store. [Continue >](#next)

---

# First try

Let's try putting this logic in the reducer. Let's add `API.get(...)` into it.

```js
function reducer (state, action) {
  if (action.type === 'LOAD_START') {
    API.get('/data.json').then(/*[ ? ]*/).catch(/*[ ? ]*/) //@
    return { ...state, loading: true }
  } else {
    return state
  }
}

createStore(reducer)
```

We have a problem. You can't `dispatch()` inside a reducer! This is how Redux was designed. Reducers only define how to move from one state to another; it can't have side effects.

> Let's try a different approach. [Continue >](#next)

---

# Second try

Let's try putting that logic in a function outside the store. Let's make a function.

```js
function load (dispatch) {
  dispatch({ type: 'LOAD_START' })
  API.get('/data.json')
    .then(data =>
      dispatch({ type: 'LOAD_FINISH', data: data }))
    .catch(error =>
      dispatch({ type: 'LOAD_ERROR', error: error }))
}

load(store.dispatch)
```

> ↳ By passing `dispatch` to `load()`, it can dispatch events.

But now we're not being consistent: we often use `store.dispatch()` to trigger actions, but this time we're using `load(...)`. We can do better.

> Let's make things more consistent. [Continue >](#next)

---

# Meet redux-thunk

Let's improve our design. [redux-thunk](https://www.npmjs.com/package/redux-thunk) is a plugin for Redux. It makes your `dispatch()` accept functions just like the one earlier.

```js
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

store = createStore(reducer, {}, applyMiddleware(thunk))
```

> ↳ redux-thunk is a **middleware**: a plugin that extends `dispatch()` to do more things. [(docs)](http://redux.js.org/docs/api/applyMiddleware.html)

```js
function load (dispatch, getState) {
  /*...*/
}

store.dispatch(load)
```

> ↳ We can take the `load()` function earlier and use it as an action.

&nbsp;

> Let's sort out our action creators. [Continue >](#next)

---

# Action creators

In a typical app, we'll likely have a few of action creators. It's best to organize these into one file.

##### actions.js

```js
export function loadProject (id) {
  return function (dispatch) {
    dispatch({ type: 'PROJECT_LOADING', data })
    return API.get(`/projects/${id}`)
      .then(data => dispatch({ type: 'PROJECT_LOADED', data }))
      .catch(err => dispatch({ type: 'PROJECT_ERROR', err }))
  }
}

export function saveProject (id) { /*...*/ }
export function deleteProject (id) { /*...*/ }
export function createProject (id, data) { /*...*/ }
```

We just built **action creators**: functions that return an action. [(docs)](http://redux.js.org/docs/basics/Actions.html) `loadProject()` and friends return functions, which redux-thunk will happily accept as actions.

```js
import { loadProject } from './actions'

store.dispatch(loadProject())
//             ^-----------^
```

> ↳ Invoke these actions by passing the functions' results to `dispatch()`.

&nbsp;

> Let's build more action creators. [Continue >](#next)

---

# Simple action creators

Action creators don't have to only be for asynchronous actions.

```js
//# actions.js
export function publishProject (id) {
  return { type: 'PROJECT_UPDATE', id, published: true }
}
```

> ↳ Even simple actions can have action creators.

&nbsp;

> Let's recap what we've learned. [Continue >](#next)

---

# Recap

**Action creators** are functions that return things that you can pass to `dispatch()`.

```js
export function publishProject (id) {
  return { type: 'PROJECT_UPDATE', id, published: true }
}

store.dispatch(publishProject(12))
```

**redux-thunk** is a plugin that will allow you to pass functions to `dispatch()`. Great for asynchronous actions.

```js
export function loadProject (id) {
  return function (dispatch) {
    dispatch({ type: 'PROJECT_LOADING', data })
    return API.get(`/projects/${id}`)
      .then(data => dispatch({ type: 'PROJECT_LOADED', data }))
      .catch(err => dispatch({ type: 'PROJECT_ERROR', err }))
  }
}

store.dispatch(loadProject(12))
```

**Middleware** are plugins for Redux that extends `dispatch()` to do more things.

```js
store = createStore(reducer, {}, applyMiddleware(reduxThunk))
```

> Let's learn about reducers. [Continue >](../reducers/README.md)
