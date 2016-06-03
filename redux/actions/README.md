# Actions

So far we've learned about actions: things you `dispatch()` to a store to change its state.

```js
store.dispatch({ type: 'PUBLISH' })
```

Actions are objects and always have a `type` key. This isn't required, but it's just the way everyone does it.

-

> How would we do it asynchronously? [Continue >](the-three-states.md)
