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
  artist: 'Miles Davis',
  year: 1959
}
```

---

You can read and write data into a plain JS object. You can do the same in Redux, but just a little differently.

<!-- example: examples/intro-simple-read -->

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

You can read from a store by checking its *state* using `getState()`.
Writing data works a bit different, though. That's where `reducer` comes in.

<!-- example: examples/intro-first-store -->

> See also: [createStore docs](http://redux.js.org/docs/basics/Actions.html)

<br>

> Next: How do you write to a store? [Next](#updating-the-store)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Updating the store
==================

You can't change the store's state from outside the store. To do that, you'll need to create actions. Actions are made through *reducer functions*, which is used by `createStore()`.

```js
import { createStore } from 'redux' //-

var store = createStore(/*{*/reducer/*}*/, article)

function reducer (state, action) {
  if (action.type === 'PUBLISH') {
    return { ...state, published: true }
  } else {
    return state
  }
}
```

Reducers take the current state and return a new one. How it changes the store depends on `action`.

---

To run an action, use `dispatch()`. This changes the store's *state*.

<!-- example: examples/intro-updating -->

> See also: [Reducer docs](http://redux.js.org/docs/basics/Reducers.html)

<br>

> Next: What does `...state` mean? [Next](#spread-operator)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The spread operator
===================

The `...` symbol is the *object spread operator*. It's available in Babel and in the 2017 version of JavaScript.
These two are roughly equivalent.

```js
return { /*{*/...state/*}*/, published: true }
// ---
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

<!-- example: examples/intro-dispatching -->

---

You can also listen for changes in the store using `subscribe()`.

<!-- example: examples/intro-subscribe -->

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

> Next: Let's learn more about actions. [Next](actions.html)
