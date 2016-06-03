# First try

Let's try putting this logic in the reducer. Let's add `API.get(...)` into it.

```js
function reducer (state, action) {
  if (action.type === 'LOAD_START') {
    API.get('/data.json').then(/*[ ? ]*/).catch(/*[ ? ]*/) //@
    return { ...state, loading: true }
  } else {
    return state
  }
}

createStore(reducer)
```

We have a problem. You can't `dispatch()` inside a reducer! This is how Redux was designed. Reducers only define how to move from one state to another; it can't have side effects.

-

> Let's try a different approach. [Continue >](second-try.md)
