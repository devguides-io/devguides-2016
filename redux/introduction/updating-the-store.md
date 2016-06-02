# Updating the store

You can't change the store's state from outside the store. To do that, you'll need to create actions. Actions are made through **reducer functions**.

```js
//# Reducer function
function articleStore (state, action) {
  if (action.type === 'PUBLISH') {
    return { ...state, published: true }
  } else {
    return state
  }
}
```

> ↳ Reducers take the current state and return a new one. How it changes the store depends on the *action*. [(docs)](http://redux.js.org/docs/basics/Reducers.html)

```js
import { createStore } from 'redux'
store = createStore(articleStore, article)
```

> ↳ You'll need a reducer to use `createStore()`.

```js
store.getState().published  //=> false

store.dispatch({ type: 'PUBLISH' })
store.getState().published  //=> true
```

> ↳ To run an action, use `dispatch()`. This changes the store's **state**.

-

> What does `...state` mean? [Continue >](spread-operator.md)
