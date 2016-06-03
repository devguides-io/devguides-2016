# Recap

**Middleware** are Redux plugins you can attach to your store.

```js
createStore(reducer, {}, applyMiddleware(logger, thunk))
//                                       ^----^  ^---^
```

They give `dispatch()` more powers.

```js
store.dispatch({ type: 'SAVE' })     // Normal
store.dispatch(fetch('/data.json'))  // Promises
store.dispatch(() => { ... })        // Functions/thunks
store.dispatch(/*...*/)              // and a lot more
```

You can use middleware to write side effects to actions.

```js
const middleware = store => dispatch => action => {
  if (action.type === 'FETCH') {
    dispatch(action) // <-- Do something different here
  }
}
```
