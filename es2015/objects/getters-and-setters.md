# Getters and setters

Apart from function shorthands, you can define special attributes that do something when read or set.

```js
Shop = {
  get closed () {
    return this.status === 'closed'
  },
  set closed (value) {
    this.status = value ? 'closed' : 'open'
  }
}

Shop.closed = true  // invokes `set closed()`
Shop.status         //=> 'closed'
Shop.closed         //=> true (invokes `get closed()`)
```

-

> Learn about writing dynamic property names. [Continue >](computed-properties.md)
