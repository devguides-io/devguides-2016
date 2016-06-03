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

-

> Let's learn about reducers. [Continue >](../reducers/README.md)
