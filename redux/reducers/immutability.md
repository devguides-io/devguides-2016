# Immutability

Never modify objects! That's the Redux way of doing things. This is called **immutability**, in other words, never having to mutate.

```js
function reducer (state, action) {
  switch (action.type) {
    case 'PUBLISH':
      state.published = true  // <-- Avoid this
      return state
```

> ↳ This is mutation: we're modifying the `state` object. Don't do this.

This seems like a hassle at first, but it makes your app faster in the long run. You'll be able to check if a state has changed.

```js
if (state === oldState) {
  /*[ things have changed ]*/
```

> ↳ React does this under-the-hood to make rendering faster.

If your React app seems like it's not updating, most of the time it's because you're using mutations. A mutated state makes `state === oldState` true even if they changed, making React skip doing updates.

-

> What happens when my reducer gets very big? [Continue >](combining-reducers.md)
