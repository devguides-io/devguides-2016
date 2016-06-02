# Our first store

```js
//# Creating our store
var reducer = /*...*/
var store = createStore(reducer, article)
```

> ↳ Stores are created using `createStore()`. [(docs)](http://redux.js.org/docs/basics/Actions.html)

```js
//# Reading from the store
var state = store.getState()
console.log(state.title) //=> 'Global Warming'
```

Stores in Redux are similar: you can get data from it by checking its **state**. Writing data works a bit different, though. That's where `reducer` comes in.

-

> How do you write to a store? [Continue >](updating-the-store.md)
