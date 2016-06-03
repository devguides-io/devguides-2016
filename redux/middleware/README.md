# Middleware

Redux plugins are often made as **middleware**.

```js
createStore(reducer, {}, applyMiddleware(logger))
//                                       ^----^
```

Middleware are just functions. Here's a middleware that does nothing.

```js
function logger (store) {
  return function (dispatch) {
    return function (action) {
      return dispatch(action)
    }
  }
}
```

> ↳ It make look complicated at first, but let's learn about this later!

With ES2015, you can shorten this to:

```js
const logger = store => dispatch => action => {
  return dispatch(action)
}
```

-

> Let's make it do something useful. [Continue >](decorating-dispatch.md)
