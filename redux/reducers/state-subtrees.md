# State subtrees

Think of your state as a tree. It has branches which have their own branches and leaves, and so on. A subtree is one branch of that tree.

```js
state = {
  profile: {            //@
    name: 'John Jones', //@
    private: true       //@
  },                    //@
  photos: [
    /*...*/
  ]
}
```

> ↳ `state.profile` is a subtree of the *state* tree.

`combineReducers()` lets you break apart your reducer. Your reducers will only operate in their own subtree, like *state.profile* above.

```js
function profile (state, action) {
  if (action.type === 'PUBLISH') {
    // `state` is actually `state.profile` here.
    return { ...state, private: false }
  }
}

reducer = combineReducers({ profile, /*...*/ })
```

This reducer can't see `state.photos`! This is usually a good thing. As your store reducers get bigger, you're assured that they only play in one part of your state tree.

-

> What if my I need my reducers to do more than that? [Continue >](reduce-reducers.md)
