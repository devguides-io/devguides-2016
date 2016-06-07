---
layout: _layouts/chapter.jade
book: Redux
chapter: Using with React
---

Using with React
================

**react-redux** is the official package used to make Redux and React work together. [(docs)](http://redux.js.org/docs/basics/UsageWithReact.html) To use it, wrap your main app (your top-most React component) inside a `<Provider>`. This lets your components see the `store`.

```js
import React from 'react' //-
import { render } from 'react-dom' //-
import { createStore } from 'redux' //-
import { /*{*/Provider/*}*/ } from 'react-redux'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
```

> Next: How do I see the state in my components? [Continue](#connecting)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Connecting to the store
=======================

react-redux provides `connect()` to let components see the store's state.

```js
import { connect } from 'redux'

PhotosList = React.createClass({ /*...*/ })
PhotosList = /*{*/connect(mapState)/*}*/(PhotosList)
```

---

What's `mapState`? It takes the `state` and returns props to be used by the component. Write this function and pass it to *connect()*.

```js
function mapState (state) {
  return /*{*/{ photos: state.photos }/*}*/
}
```

---

You can use the props you made in *mapState()* inside your component as `this.props`.

```js
var PhotosList = React.createClass({
  render () {
    let photos = /*{*/this.props.photos/*}*/
    return <div>{photos.map(/*...*/)}</div>
  }
})
```

> Next: What about dispatching events? [Continue](#dispatching)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Dispatching
===========

`connect()` also lets you send *props* to your Components that map to dispatch calls. The 2nd argument of `connect()` lets you do this.

```js
var PhotosList = connect(mapState, /*{*/mapDispatch/*}*/)(PhotosList)
```

---

Provide it a function that returns properties to be added to your component. These properties are functions that you can call later on.

```js
function mapDispatch (dispatch) {
  return {
    onPublishClick: function () {
      dispatch({ type: 'PUBLISH' })
    }
  }
}
```

---

These properties will be available in `props` in your component. You can then call them on certain events like *onClick*.

```js
<button onClick={() => this.props.onPublishClick()}>
```

> Next: Let's recap what we've learned. [Continue](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Recap
=====

**react-redux** lets you make Redux and React work together. [(docs)](http://redux.js.org/docs/basics/UsageWithReact.html) `Provider` makes React components aware of a store.

```js
import { Provider } from 'react-redux' //-

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'))
```

---

`connect()` lets components communicate with a store.

```js
import { connect } from 'react-redux' //-

MyComponent = /*{*/connect(mapState, mapDispatch)/*}*/(MyComponent)
```

---

`mapState` should return props as taken from the state tree.

```js
function mapState (state) {
  return { /*{*/photos/*}*/: state.photos }
}
```

---

`mapDispatch` should return props that have functions to dispatch actions.

```js
function mapDispatch (dispatch) {
  return {
    /*{*/onPublishClick/*}*/: () => {
      dispatch({ type: 'PUBLISH' })
    }
  }
}
```

---

These props are available in your components as `this.props`.

```js
<h1>{this.props.photos.map(/*...*/)}</h1>
<button onClick={() => this.props.onPublishClick()}>
```

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

> Next: Let's enhance your store with middleware. [Continue](middleware.html)
