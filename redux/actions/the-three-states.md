# The three states

Each asynchronous action typically has 3 states: `loading`, `success`, and `error`. Imagine each action looking like this:

```js
store.dispatch({ type: 'LOAD_START' })
fetchData()
  .then(data =>
    store.dispatch({ type: 'LOAD_FINISH', data: data }))
  .catch(error =>
    store.dispatch({ type: 'LOAD_ERROR', error: error }))
```

-

Let's try to hook this up to our store. [Continue >](first-try.md)
