# Nested blocks

Variables defined using `let` and `const` are available only inside `{...}` blocks, and other blocks inside them.

```js
function run (user) {
  if (user) {
    let running = user.state === 'running'
    if (running) {
      /*[ `running` is still available here ]*/
    } else {
      /*[ and here, too ]*/
    }
  } else {
    /*[ but not here! ]*/
  }
}
```

-

> Learn recap what we've learned. [Continue >](recap.md)
