# Dispatching actions

```js
store.dispatch({ type: 'UPDATE', title: 'Global Warming 101' })
store.dispatch({ type: 'PUBLISH' })
store.dispatch({ type: 'ADD_COMMENT', text: 'I agree!' })
```

The only way to change the store's state is by dispatching actions. You can then easily make a log of what actions have happened, or even undo them.

```js
store.subscribe(() => {
  /*...*/
})
```

> ↳ You can also listen for changes in the store using `subscribe()`.

-

> Let's use Redux with React. [Continue >](react-redux.md)
