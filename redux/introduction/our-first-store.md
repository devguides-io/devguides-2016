# Our first store

Stores are created using `createStore()`. [(docs)](http://redux.js.org/docs/basics/Actions.html)

```js
var reducer = /*...*/
var store = createStore(reducer, album)
```

Read from the store using `getState()`.

```js
var state = store.getState()
console.log(state.title) //=> 'Kind of Blue'
```

You can get data from store by checking its **state**. Writing data works a bit different, though. That's where `reducer` comes in.

-

> How do you write to a store? [Continue >](updating-the-store.md)
