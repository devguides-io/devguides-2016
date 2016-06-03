# Object shorthand

Ever type `{ foo: foo }` and find it repetitive? This is common when writing exports.

```js
module.exports = {
  update: update,
  save: save
}
```

In ES2015, you can shorten this to:

```js
module.exports = { update, save }
```

> ↳ `update` rolls out into `update: update`.

You can use this shorthand anywhere in a `{...}` object.

```js
module.exports = { update, save, create: createItem }
```

-

> You can shorten functions, too. [Continue >](function-shorthand.md)
