# Redux

Redux, pocket-explained.

----

# Stores

```js
article = {
  title: 'Global Warming',
  published: false,
  body: /*...*/
}
```

Think of Redux as a way to manage a store of data. In fact, you may have already done this: the example above is a plain JS object that stores data.

```js
console.log(article.title)  // <- Read
article.published = true    // <- Write
```

You can read and write data into a plain JS object. You can do the same in Redux, but just a little differently.

-

> How would you do that in Redux? [Continue >](#)

----

# Our first store

```js
//# Creating our store
reducer = /*...*/
store = createStore(reducer, article)
```

```js
//# Reading from the store
state = store.getState()
console.log(state.title) //=> 'Global Warming'
```

Stores in Redux are similar: you can get data from it by checking its **state**. Writing data works a bit different, though. That's where `reducer` comes in.

-

> How do you write to a store? [Continue >](#)

----

# Updating the store

You can't change the store's state from outside the store. To do that, you'll need to create actions. Actions are made through **reducer functions**.

```js
//# Reducer function
function articleStore (state, action) {
  if (action.type === 'PUBLISH') {
    return { ...state, published: true }
  } else {
    return state
  }
}
```

> ^ Reducers take the current state and return a new one. How it change the store depends on the *action*.

```js
store = createStore(articleStore, article)
```

> ^ You'll need a reducer to use `createStore()`.

```js
store.getState().published  //=> false

store.dispatch({ type: 'PUBLISH' })
store.getState().published  //=> true
```

> ^ To run an action, use `dispatch()`.

-

> What does `...state` mean? [Continue >](#)

---

# The spread operator

```js
return { ...state, published: true }
```

The `...` symbol is the **object spread operator**. That line is roughly the same as this:

```js
return {
  title: state.title, //@
  body: state.body, //@
  published: true
}
```

> ^ The contents of `state` is rolled out in place of `...state`.

It's available in Babel and in the 2017 version of JavaScript.

-

> Learn more about actions. [Continue >](#)

----

# Dispatching actions

```js
store.dispatch({ type: 'UPDATE', title: 'Global Warming 101' })
store.dispatch({ type: 'PUBLISH' })
store.dispatch({ type: 'ADD_COMMENT', text: 'I agree!' })
```

The only way to change the store's state is by dispatching actions. You can then easily make a log of what actions have happened, or even undo them.

```js
store.subscribe(() => {
  /*...*/
})
```

> ^ You can also listen for changes in the store using `subscribe()`.

-

> Let's use Redux with React. [Continue >](#)