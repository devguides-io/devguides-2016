# Meet redux-thunk

Let's improve our design. [redux-thunk](https://www.npmjs.com/package/redux-thunk) is a plugin for Redux. It makes your `dispatch()` accept functions just like the one above.

```js
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

store = createStore(reducer, {}, applyMiddleware(reduxThunk))
```

> ↳ redux-thunk is a **middleware**: a plugin that extends `dispatch()` to do more things.

```js
function load (dispatch, getState) {
  /*...*/
}

store.dispatch(load)
```

> ↳ We can take the `load()` function earlier and use it as an action.

-

> Let's sort out our action creators. [Continue >](action-creators.md)
