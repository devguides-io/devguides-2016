# let vs. var

`let` is scoped to a block instead. A *let* is only available inside that *{ ... }* block.

```js
function greet (user) {
  if (user.gender === male) {
    let name = 'Mr. ' + user.name //@
  } else {
    let name = 'Ms. ' + user.name //@
  }

  console.log('Hello, ' + name)
  //=> "Hello, undefined"
}
```

> ↳ Here, the `name`s are only available inside their respective *if* and *else* blocks.

On the other hand, `var` is scoped to a function. If we changed *let* to *var* above, it'd work like you expect it.

-

> Learn about `let`'s cousin. [Continue >](constants.md)
