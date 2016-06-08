---
layout: _layouts/chapter.jade
book: Redux
chapter: Reducers
---

Reducers
========

The function you pass to `createStore()` is called a reducer. It's a simple function that takes in a state, and returns another state.

```js
reducer(state, action) //=> state
```

---

Most reducers use `switch` inside them to do different things depending on the `action`.

```js
function reducer (state, action) {
  switch (action.type) {
    case 'PUBLISH':
      return /*{*/{ ...state, published: true }/*}*/
    case 'UNPUBLISH':
      return /*{*/{ ...state, published: false }/*}*/
    case 'UPDATE':
      return /*{*/{ ...state, ...action.data }/*}*/
    default:
      return state
  }
}
```

> Next: Why do we keep using `...`? [Next](#immutability)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Immutability
============

Never modify objects! That's the Redux way of doing things. This is called *immutability*, in other words, never having to mutate.

```js
function reducer (state, action) { //-
  switch (action.type) { //-
    case 'PUBLISH': //-
      state.published = true  // <-- Avoid this
      return state //-
```

> This is mutation: we're modifying the `state` object. Don't do this.

---

This seems like a hassle at first, but it makes your app faster in the long run. You'll be able to check if a state has changed.

```js
if (state === oldState) {
  //! ...then things have changed
}
```

> React does this under-the-hood to make rendering faster.

---

If your React app seems like it's not updating, most of the time it's because you're using mutations. A mutated state makes `state === oldState` true even if they changed, making React skip doing updates.

> Next: What happens when my reducer gets very big? [Next](#combining-reducers)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Combining reducers
==================

Let's say you app has *articles* and *users*. If we put everything into one reducer, we'll be writing a very long function! There's a better way. Imagine your store state looks like this:

```js
{
  articles: {/*...*/},
  users: {/*...*/}
}
```

---

You can use `combineReducers` to make two reducers, each working on one part. [(docs)](http://redux.js.org/docs/api/combineReducers.html)

```js
import { combineReducers, createStore } from 'redux' //-

function articles (state, action) {
  //! ...`state` is `state.articles` here
}

function users (state, action) {
  //! ...`state` is `state.users` here
}

let reducer = /*{*/combineReducers({ articles, users })/*}*/
let store = createStore(reducer) //-
```

This is only useful if each reducer works on a single part of your state.

> Next: What do you mean "on a single part"? [Next](#state-subtrees)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

State subtrees
==============

Think of your state as a tree. It has branches which have their own branches and leaves, and so on. A subtree is one branch of that tree.

```js
state = { //-
  profile: {
    name: 'John Jones',
    private: true
  },
  photos: [ //-
    /*...*/ //-
  ] //-
} //-
```

> `state.profile` is a subtree of the *state* tree.

---

`combineReducers()` lets you break apart your reducer. Your reducers will only operate in their own subtree, like *state.profile* above.

```js
function profile (state, action) {
  if (action.type === 'PUBLISH') {
    //! `state` is actually `state.profile` here.
    return { ...state, private: false }
  }
}
// ---
reducer = combineReducers({ /*{*/profile/*}*/, /*...*/ })
```

This reducer can't see `state.photos`! This is usually a good thing. As your store reducers get bigger, you're assured that they only play in one part of your state tree.

> Next: What if my I need my reducers to do more than that? [Next](#reduce-reducers)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Reduce reducers
===============

Another approach to combining reducers is to use *reduce-reducers*. Unlike *combineReducers()*, these sub-reducers will be able to work on the entire tree.

```js
import reduceReducers from 'reduce-reducers' //-

function profiles (state, action) {
  /*[ see the whole `state` here ]*/
}
// ---
function photos (state, action) {
  /*[ see the whole `state` here ]*/
}
// ---
let reducer = /*{*/reduceReducers(profiles, photos)/*}*/
createStore(reducer)
```

reduce-reducers is a 3rd-party package. It's one of the many plugins available in the Redux ecosystem in npm.

> See also: [reduce-reducers](https://github.com/acdlite/reduce-reducers)

<!-- -->

> Next: Let's recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Recap
=====

**Reducers** are functions that take a state, and return a new state.

```js
reducer(state, action) //=> state
```

---

**Immutable:** reducers work your state in a way that never mutates objects.

```js
function reducer (state, action) {
  state.published = true  // <-- Avoid this
```

---

**Composing:** You can use `combineReducers()` or `reduce-reducers` to break a big reducer into smaller reducers.

```js
function profile (state, action) { /*...*/ }
function photos (state, action) { /*...*/ }

combineReducers({ profile, photos })
```

> Next: Let's use Redux with React. [Next](react.html)
