# Middleware signature

You may have noticed that middleware functions look a bit confusing. It's a function, that returns a function, that returns a function.

```js
const logger = store => dispatch => action => {
  return dispatch(action)
}
```

Forget about its strange look. Think of it as a single function.

```js
function logger (store, dispatch, action) { /*...*/ }
```

But having them as functions-that-return-functions makes for something interesting: it breaks the middleware into 3 steps that are applied separately.

```js
const logger = function (store) {
  // You can get store.dispatch() and store.getState() here.
  return function (dispatch) {
    // This only runs once.
    return function (action) {
      // This runs every dispatch().
    }
  }
}
```

Most middleware will not need this, but the Redux docs has [examples](http://redux.js.org/docs/advanced/Middleware.html) when this can be useful.

-

> Let's recap what we've learned. [Continue >](recap.md)
