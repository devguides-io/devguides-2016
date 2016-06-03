# Side effects

A store's reducers should have no side effects. Middleware is often used for that instead. Let's write a middleware that performs AJAX requests using [window.fetch()](https://fetch.spec.whatwg.org/).

```js
const fetcher = store => dispatch => action => {
  const { type, next, url } = action
  if (type === 'FETCH') {
    dispatch(next + '_PENDING')
    fetch(url)
    .then(result => dispatch({ type: next + '_SUCCESS', result })
    .then(error => dispatch({ type: next + '_ERROR', result })
  } else {
    dispatch(action)
  }
}
```

> ↳ This middleware listens for `FETCH` actions.

```js
store.dispatch({ type: 'FETCH', next: 'LOAD', url: '/data.json' })
```

> ↳ When using the middleware, this dispatches `LOAD_PENDING`, `LOAD_SUCCESS` and `LOAD_ERROR`.

-

> Let's improve your Redux experience with npm. [Continue >](common-middleware.md)
