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

> ↳ The contents of `state` is rolled out in place of `...state`.

It's available in Babel and in the 2017 version of JavaScript.

-

> Learn more about actions. [Continue >](dispatching-actions.md)
