# Recap

**Reducers** are functions that take a state, and return a new state.

```js
reducer(state, action) → state
```

**Immutable:** reducers work your state in a way that never mutates objects.

```js
function reducer (state, action) {
  state.published = true  // <-- Avoid this
```

**Composing:** You can use `combineReducers()` or `reduce-reducers` to break a big reducer into smaller reducers.

```js
function profile (state, action) { /*...*/ }
function photos (state, action) { /*...*/ }

combineReducers({ profile, photos })
```
