# Combining reducers

Let's say you app has *articles* and *users*. If we put everything into one reducer, we'll be writing a very long function!

There's a better way. Imagine your store state looks like this:

```js
{
  articles: {/*...*/},
  users: {/*...*/}
}
```

You can use `combineReducers` to separate these two concerns to their own reducers. [(docs)](http://redux.js.org/docs/api/combineReducers.html)

```js
import { combineReducers, createStore } from 'redux'

function articles (state, action) {
  /*[ `state` is `state.articles` here ]*/
}
function users (state, action) {
  /*[ `state` is `state.users` here ]*/
}
let reducer = combineReducers({ articles, users })

let store = createStore(reducer)
```

This is only useful if each reducer works on a single part of your state.

-

> What do you mean "on a single part"? [Continue >](state-subtrees.md)
