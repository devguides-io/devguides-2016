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

-

> Let's try to hook this up to our store. [Continue >](first-try.md)
