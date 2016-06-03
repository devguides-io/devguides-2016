# Common middleware

The npm ecosystem has a lot of useful Redux middleware.

[redux-thunk](https://www.npmjs.com/package/redux-thunk) lets you dispatch functions.

```js
store.dispatch((dispatch) => { /*...*/ })
```

[redux-multi](https://github.com/ashaffer/redux-multi) lets you dispatch many actions in one action.

```js
store.dispatch([
  { type: 'INCREMENT', payload: 2 },
  { type: 'INCREMENT', payload: 3 }
])
```

[redux-logger](https://github.com/evgenyrodionov/redux-logger) shows you Redux actions as they happen.

```
action @ 13:11:00 FETCH (in 0.1ms)
action @ 13:11:01 LOAD_PENDING (in 0.1ms)
action @ 13:11:02 LOAD_SUCCESS (in 0.1ms)
```

-

> Did you wonder why middleware looks like `store => dispatch => action`? [Continue >](signature.md)
