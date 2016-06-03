# Reduce reducers

Another approach to combining reducers is to use **reduce-reducers**. Unlike *combineReducers()*, these sub-reducers will be able to work on the entire tree.

```js
import reduceReducers from 'reduce-reducers'

function profiles (state, action) {
  /*[ see the whole `state` here ]*/
}
function photos (state, action) {
  /*[ see the whole `state` here ]*/
}

let reducer = reduceReducers(profiles, photos)
createStore(reducer)
```

reduce-reducers is a 3rd-party package. [(docs)](https://github.com/acdlite/reduce-reducers) It's one of the many plugins available in the Redux ecosystem in npm.

-

> Let's recap what we've learned. [Continue >](recap.md)
