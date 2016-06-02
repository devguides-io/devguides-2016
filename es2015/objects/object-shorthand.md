# Object shorthand

Ever type `{ foo: foo }` and find it repetitive? This is common when writing exports.

```js
module.exports = {
  getState: getState,
  setState: setState
}
```

In ES2015, you can shorten this to:

```js
module.exports = { getState, setState }
```

You can use this shorthand anywhere in a `{...}` object.

```js
module.exports = { getState, setState, create: createStore }
```

-

> You can shorten functions, too. [Continue >](function-shorthand.md)
