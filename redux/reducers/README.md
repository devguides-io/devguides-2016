# Reducers

The function you pass to `createStore()` is called a reducer. It's a simple function that takes in a state, and returns another state.

```js
reducer(state, action) → state
```

Most reducers use `switch` inside them to do different things depending on the `action`.

```js
function reducer (state, action) {
  switch (action.type) {
    case 'PUBLISH':
      return { ...state, published: true }
    case 'UNPUBLISH':
      return { ...state, published: false }
    case 'UPDATE':
      return { ...state, ...action.data }
    default:
      return state
  }
}
```

-

> Why do we keep using `...`? [Continue >](immutability.md)
