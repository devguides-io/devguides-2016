---
layout: _layouts/chapter.jade
book: Redux
chapter: Middleware
---

Middleware
==========

Redux plugins are often made as *middleware*.
Middleware are just functions. Here's a middleware that does nothing.


```js
createStore(reducer, {}, /*{*/applyMiddleware(logger)/*}*/)
```

```js
function logger (store) {
  return function (dispatch) {
    return function (action) {
      return dispatch(action)
    }
  }
}
```

> It make look complicated at first, but let's learn about this later!

---

With ES2015, you can shorten this to:

```js
const logger = store => dispatch => action => {
  return dispatch(action)
}
```

> Also see: [applyMiddleware()](http://redux.js.org/docs/api/applyMiddleware.html)

<!-- -->

> Next: Let's give extra powers to `dispatch()`. [Next](#decorating-dispatch)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Decorating dispatch
===================

Middleware is most commonly used to make `dispatch()` do something else.

```js
const logger = store => dispatch => action => {
  console.log('Dispatching:', action.type)
  console.log('Old state:', store.getState())
  var result = dispatch(action)
  console.log('New state:', store.getState())
  return result
}
```

---

In this example, we've made `dispatch()` log some messages before and after dispatching.

```js
store.dispatch({ type: 'SAVE' })
// ---
//=> Dispatching: SAVE
//=> Old state: { ... }
//=> New state: { ... }
```

> Next: Let's use this for something useful. [Next](#side-effects)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Side effects
============

A store's reducers should have no side effects. Middleware is often used for that instead. Let's write a middleware that performs AJAX requests using [window.fetch()](https://fetch.spec.whatwg.org/).

```js
const fetcher = store => dispatch => action => {
  const { type, next, url } = action
  if (type === 'FETCH') {
    /*{*/dispatch({ type: `${next}_PENDING` })/*}*/
    return fetch(url)
    .then(result => /*{*/dispatch({ type: `${next}_SUCCESS`, result })/*}*/)
    .then(error => /*{*/dispatch({ type: `${next}_ERROR`, error })/*}*/)
  } else {
    return dispatch(action)
  }
}
// ---
// -- This function will replace `dispatch()`. It listens for `FETCH` actions.
```

```js
store.dispatch({ type: 'FETCH', next: 'LOAD', url: '/data.json' })
// ---
// -- When using the middleware, this dispatches `LOAD_PENDING`, `LOAD_SUCCESS` and `LOAD_ERROR`.
```

<br>

> Next: Let's improve your Redux experience with npm. [Next](#common-middleware)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Common middleware
=================

The npm ecosystem has a lot of useful Redux middleware. For instance, [redux-thunk](https://www.npmjs.com/package/redux-thunk) lets you dispatch functions.

```js
store.dispatch((dispatch) => { /*...*/ })
```

---

[redux-multi](https://github.com/ashaffer/redux-multi) lets you dispatch many actions in one action.

```js
store.dispatch([
  { type: 'INCREMENT', payload: 2 },
  { type: 'INCREMENT', payload: 3 }
])
```

---

[redux-logger](https://github.com/evgenyrodionov/redux-logger) shows you Redux actions as they happen.

```
action @ 13:11:00 FETCH (in 0.1ms)
action @ 13:11:01 LOAD_PENDING (in 0.1ms)
action @ 13:11:02 LOAD_SUCCESS (in 0.1ms)
```

> Next: Did you wonder why middleware looks like `store => dispatch => action`? [Next](#middleware-signature)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Middleware signature
====================

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

---

Having them as functions-that-return-functions makes for something interesting: it breaks the middleware into 3 steps that are applied separately.

```js
const logger = function (store) {
  // <-- You can get store.dispatch() and store.getState() here.
  return function (dispatch) {
    // <-- This runs on `createStore()`.
    return function (action) {
      // <-- This runs every `dispatch()`.
    }
  }
}
```

Most middleware will not need this, but the Redux docs has [examples](http://redux.js.org/docs/advanced/Middleware.html) when this can be useful.

<br>

> Next: Let's recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Recap
=====

**Middleware** are Redux plugins you can attach to your store.

```js
createStore(reducer, {}, applyMiddleware(/*{*/logger/*}*/, /*{*/thunk/*}*/))
```

---

They give `dispatch()` more powers.

```js
store.dispatch({ type: 'SAVE' })     /// Normal
store.dispatch(fetch('/data.json'))  /// Promises
store.dispatch(() => { /*...*/ })     /// Functions/thunks
store.dispatch(/*...*/)               /// ...and more
```

---

You can use middleware to write side effects to actions.

```js
const middleware = store => dispatch => action => {
  if (action.type === 'FETCH') {
    doSomethingDifferent()
  }
  dispatch(action)
}
```

> Next: That's all for now! [Back](.)
