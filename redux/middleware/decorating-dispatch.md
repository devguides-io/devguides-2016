# Decorating dispatch

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

In this example, we've made `dispatch()` log some messages before and after dispatching.

```js
store.dispatch({ type: 'SAVE' })
// Dispatching: SAVE
// Old state: { ... }
// New state: { ... }
```

-

> Let's use this for something useful. [Continue >](side-effects.md)
