# Second try

Let's try putting that logic in a function outside the store.

```js
function load (dispatch) {
  dispatch({ type: 'LOAD_START' })
  API.get('/data.json')
    .then(data =>
      dispatch({ type: 'LOAD_FINISH', data: data }))
    .catch(error =>
      dispatch({ type: 'LOAD_ERROR', error: error }))
}
```

> ↳ Calling `load(store.dispatch)` will pull via AJAX and dispatch some events.

But now we're not being consistent: we often use `store.dispatch()` to trigger actions, but this time we're using `load(...)`.

-

> Let's make things more consistent. [Continue >](redux-thunk.md)
