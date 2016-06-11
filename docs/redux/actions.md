---
layout: _layouts/chapter.jade
book: Redux
chapter: Actions
next: reducers
---

# Actions

So far we've learned about actions: things you `dispatch()` to a store to change its state.

```js
store.dispatch(/*{*/{ type: 'PUBLISH' }/*}*/)
```

Actions are objects and always have a `type` key. This isn't required, but it's just the way everyone does it.

> Next: How would we do it asynchronously? [Next](#next)


* * * *

# The three states

Processes are *asynchronous* when they take a long time, such as AJAX calls to load some data. They usually have 3 states: `pending`, `success`, and `error`. Imagine it looking like this:

```js
store.dispatch(/*{*/{ type: 'LOAD_START' }/*}*/)
fetch('/data.json')
  .then(data =>
    store.dispatch(/*{*/{ type: 'LOAD_FINISH', data: data })/*}*/)
  .catch(error =>
    store.dispatch(/*{*/{ type: 'LOAD_ERROR', error: error })/*}*/)
```

> Assuming `fetch()` returns a promise, we can use it to trigger store actions when something happens.

<!-- -->

> Next: Let's try to hook this up to our store. [Next](#next)

* * * *

# First try

Let's try putting this logic in the reducer. Let's add `fetch()` into it.

```js
function reducer (state, action) {
  if (action.type === 'LOAD_START') {
    /*{*/fetch('/data.json').then(/*[ ?? ]*/).catch(/*[ ?? ]*/)/*}*/
    return { ...state, loading: true }
  } else { //-
    return state //-
  } //-
} //-

createStore(reducer) //-
```

It seems you can't `dispatch()` inside a reducer! This is how Redux was designed. Reducers only define how to move from one state to another; it can't have side effects.

> Next: Let's try a different approach. [Next](#next)

* * * *

# Second try

Let's try putting that logic in a function outside the store. Let's make a function.

<!-- example: examples/actions-second-try -->

> By passing `dispatch` to `load()`, it can dispatch events.

---

But now we're not being consistent: we often use `store.dispatch()` to trigger actions, but this time we're using `load(...)`. We can do better.

```js
/*{*/load(store.dispatch)/*}*/              // <-- this new way
// ---
store.dispatch({ type: 'INIT' })  // <-- everything else
  ```

> Next: Let's make things more consistent. [Next](#next)

* * * *

# Meet redux-thunk

Let's improve our design. [redux-thunk](https://www.npmjs.com/package/redux-thunk) is a plugin for Redux. It makes your `dispatch()` accept functions just like the one earlier.

```js
import thunk from 'redux-thunk' //-
import { createStore, applyMiddleware } from 'redux' //-

store = createStore(reducer, {}, /*{*/applyMiddleware(thunk)/*}*/)
```

---

redux-thunk is a Middleware, or a plugin that extends `dispatch()` to do more things.

```js
function load (dispatch, getState) {
  /*...*/
}

store.dispatch(/*{*/load/*}*/)
```

> We can take the `load()` function earlier and use it as an action.

<!-- -->

> Also see: [applyMiddleware()](http://redux.js.org/docs/api/applyMiddleware.html) [redux-thunk](https://www.npmjs.com/package/redux-thunk)

<!-- -->

> Next: Let's sort out our action creators. [Next](#next)

* * * *

# Action creators

In a typical app, we'll likely have a few of action creators. It's best to organize these into one file.

```js
export function loadProject (id) {
  return function (dispatch) { //-
    dispatch({ type: 'PROJECT_LOADING', data }) //-
    return fetch(`/projects/${id}`) //-
      .then(data => dispatch({ type: 'PROJECT_LOADED', data })) //-
      .catch(err => dispatch({ type: 'PROJECT_ERROR', err })) //-
  } //-
}

export function saveProject (id) { /*...*/ }
export function deleteProject (id) { /*...*/ }
export function createProject (id, data) { /*...*/ }
```

> Save this file as `actions.js`.

---

*Action Creators are* functions that return an action. `loadProject()` and friends return functions, which redux-thunk will happily accept as actions.

```js
import { loadProject } from './actions'

store.dispatch(/*{*/loadProject()/*}*/)
```

> Invoke these actions by passing the functions' results to `dispatch()`.

<!-- -->

> Also see: [Actions](http://redux.js.org/docs/basics/Actions.html)

<!-- -->

> Next: Let's build more action creators. [Next](#next)

* * * *

# Simple action creators

Action creators don't have to only be for asynchronous actions. Even simple actions can have action creators.

```js
export function publishProject (id) {
  return { type: 'PROJECT_UPDATE', id, published: true }
}
```

> Next: Let's recap what we've learned. [Next](#next)

* * * *

# Recap

**Action creators** are functions that return things that you can pass to `dispatch()`.

```js
export function publishProject (id) {
  return { type: 'PROJECT_UPDATE', id, published: true }
}
// ---
store.dispatch(/*{*/publishProject(12)/*}*/)
```

---

**redux-thunk** is a plugin that will allow you to pass functions to `dispatch()`. Great for asynchronous actions.

```js
export function loadProject (id) {
  /*{*/return function (dispatch) {/*}*/
    dispatch({ type: 'PROJECT_LOADING', data })
    return fetch(`/projects/${id}`)
      .then(data => dispatch({ type: 'PROJECT_LOADED', data }))
      .catch(err => dispatch({ type: 'PROJECT_ERROR', err }))
  }
}
// ---
store.dispatch(/*{*/loadProject(12)/*}*/)
```


---

**Middleware** are plugins for Redux that extends `dispatch()` to do more things.

```js
store = createStore(reducer, {}, /*{*/applyMiddleware(reduxThunk)/*}*/)
```

> Next: Let's learn about reducers. [Next](reducers)
