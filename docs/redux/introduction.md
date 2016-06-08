---
layout: _layouts/chapter.jade
book: Redux
chapter: Introduction
---

Redux
=====

[Redux](http://redux.js.org/) is used to manage data in a React application. Using redux means you create a *store* that a React app listens to.

```js
import { createStore } from 'redux'

var store = createStore(/*...*/)
```

> Next: What's a store? [Next](#stores)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Stores
======

Think of a store as a bunch of data. In fact, you may have already done this: the example here is a plain JS object that stores data.

```js
var album = {
  title: 'Kind of Blue',
  artist: 'Miles Davis'
  year: 1959
}
```

---

You can read and write data into a plain JS object. You can do the same in Redux, but just a little differently.

```js
console.log(album.title)  // <- Read
album.genre = 'Jazz'      // <- Write
```

> Next: How would you do that in Redux? [Next](#our-first-store)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Our first store
===============

Stores are created using `createStore()`.

```js
import { createStore } from 'redux' //-

var reducer = /*...*/
var store = /*{*/createStore(reducer, album)/*}*/
```

---

You can get data from store by checking its *state* using `getState()`.

```js
var state = /*{*/store.getState()/*}*/
console.log(state.title) //=> 'Kind of Blue'
```

---

Writing data works a bit different, though. That's where `reducer` comes in.

> See also: [createStore docs](http://redux.js.org/docs/basics/Actions.html)

<br>

> Next: How do you write to a store? [Next](#updating-the-store)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Updating the store
==================

You can't change the store's state from outside the store. To do that, you'll need to create actions. Actions are made through *reducer functions*.

```js
function reducer (state, action) {
  if (action.type === 'PUBLISH') {
    return { ...state, published: true }
  } else {
    return state
  }
}
```

> Reducers take the current state and return a new one. How it changes the store depends on `action`.

---

You'll need a reducer to use `createStore()`.

```js
import { createStore } from 'redux' //-
var store = /*{*/createStore(reducer, article)/*}*/
```

---

To run an action, use `dispatch()`. This changes the store's *state*.

```js
store.getState().published  //=> false

/*{*/store.dispatch({ type: 'PUBLISH' })/*}*/
store.getState().published  //=> true
```

<!--
var store = createStore(reducer)

store.dispatch({ type: 'SET', value: 10 })
console.log(store.getState())

store.dispatch({ type: 'ADD', value: 3 })
console.log(store.getState())

function reducer (state, action) {
  switch (action.type) {
    case 'SET':
      return action.value
    case 'ADD':
      return state + action.value
    default:
      return state
  }
}
-->

> See also: [Reducer docs](http://redux.js.org/docs/basics/Reducers.html)

<br>

> Next: What does `...state` mean? [Next](#spread-operator)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The spread operator
===================

```js
return { /*{*/...state/*}*/, published: true }
```

The `...` symbol is the *object spread operator*. It's available in Babel and in the 2017 version of JavaScript.

---

That line is roughly the same as this:

```js
return {
  /*{*/title: state.title,/*}*/
  /*{*/body: state.body,/*}*/
  published: true
}
```

> The contents of `state` is rolled out in place of `...state`.

<!--
var state = { name: 'John', age: 3 }
inspect({ ...state, published: true })
-->

<br>

> See also: [Object spread docs](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html)

<br>

> Next: Let's learn more about actions. [Next](#dispatching-actions)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Dispatching actions
===================

The only way to change the store's state is by dispatching actions. You can then easily make a log of what actions have happened, or even undo them.

```js
store.dispatch({ type: 'UPDATE', title: 'Global Warming 101' })
store.dispatch({ type: 'PUBLISH' })
store.dispatch({ type: 'ADD_COMMENT', text: 'I agree!' })
```

```js
store.subscribe(() => {
  /*...*/
})
```

> You can also listen for changes in the store using `subscribe()`.

<!--
var store = createStore(reducer)

store.subscribe(() => {
  inspect(store.getState())
})

store.dispatch({ type: 'SET', value: 10 })
store.dispatch({ type: 'ADD', value: 3 })

function reducer (state, action) {
  switch (action.type) {
    case 'SET':
      return action.value
    case 'ADD':
      return state + action.value
    default:
      return state
  }
}
-->

> Next: Let's recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Recap

**Stores** are made from reducer functions.

```js
import { createStore } from 'redux' //-
store = createStore(reducer, {/*[ initial state ]*/})
```

---

**Actions** are dispatched to the reducer.

```js
store.dispatch(/*{*/{ type: 'PUBLISH' }/*}*/)
```

---

**Reducers** tell us how to change a `state` based on an `action`.

```js
function reducer (state, action) {
  if /*{*/(action.type === 'PUBLISH')/*}*/ {
    return { ...state, published: true }
  }
  return state
}
```

---

**States:** the store keeps a state, and you can listen for updates using `subscribe()`.

```js
/*{*/store.getState()/*}*/.published
store.subscribe(() => { /*...*/ })
```

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Let's learn more about actions. [Next](actions.html)
