# First try

Let's try putting this logic in the reducer.

```js
function reducer (state, action) {
  if (action.type === 'LOAD_START') {
    fetchData().then(/*...*/).catch(/*...*/)
    return { ...state, loading: true }
  } else {
    return state
  }
}

createStore(reducer)
```

We've ran into a problem here: you can't `dispatch()` inside a reducer, you have no access to the store! This is exactly how Redux was designed.

-

> Let's try a different approach. [Continue >](second-try.md)
