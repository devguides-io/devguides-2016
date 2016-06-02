# Recap


```js
import { createStore } from 'redux'

createStore(reducer, {/*[ initial state ]*/})
```

> ↳ Stores are made from reducer functions.

```js
function reducer (state, action) {
  if (action.type === 'PUBLISH') {
    return { ...state, published: true }
  }
  return state
}
```

> ↳ Reducers tell us how to change a `state` based on an `action`.

```js
store.dispatch({ type: 'PUBLISH' })
```

> ↳ Actions are dispatched to the reducer.

```js
store.getState()
store.subscribe(() => { /*...*/ })
```

> ↳ The store keeps a state, and you can listen for updates using `subscribe()`.

-

> Let's learn more about actions. [Continue >](../actions/actions.md)
