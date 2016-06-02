# Objects

ES2015 offers some shorthand for writing objects.

```js
App = {
  handler,
  start () { return this.go() },
  get closed () { return this.status === 'closed' },
  set closed (val) { this.status = val ? 'closed' : 'open' },
  [ 'prop_' + n ]: 42
}
```

-
