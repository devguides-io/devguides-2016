# Recap

`let` is the new `var`. `const` is the same, but doesn't let you change it.

```js
let a = 'hello'
const b = 'hi'
```

They are "block scoping": they are only available within `{...}` blocks, but not outside them.

```js
if (true) {
  let a = 'hello'
}
console.log(a)  //=> undefined
```

-

> Learn what's new with objects. [Continue >](../objects/README.md)
