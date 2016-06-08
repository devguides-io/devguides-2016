---
layout: _layouts/chapter.jade
book: ES2015
chapter: Objects
---

# Objects

ES2015 offers some shorthand for writing object
[Names](#name-shorthand),
[Functions](#functions-shorthand),
[Getters and setters](#getters-and-setters), and
[Computed name](#computed-names) properties.

```js
App = {
  // Names
  /*{*/handler/*}*/,

  // Functions
  /*{*/start ()/*}*/ { return this.go() },

  // Getters and setters
  /*{*/get closed ()/*}*/ { return this.status === 'closed' },
  /*{*/set closed (val)/*}*/ { this.status = val ? 'closed' : 'open' },

  // Computed properties
  /*{*/[ 'prop_' + n ]/*}*/: 42
}
```

> Next: What's `handler` up there mean? [Next](#name-shorthand)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Name shorthand

Ever type `{ foo: foo }` and find it repetitive? This is common when writing exports.

```js
module.exports = {
  /*{*/update: update/*}*/,
  save: save
}
```

---

In ES2015, you can shorten this to:

```js
module.exports = { /*{*/update/*}*/, save }
```

> `update` rolls out into `update: update`.

---

You can use this shorthand anywhere in a `{...}` object.

```js
module.exports = { /*{*/update/*}*/, save, create: createItem }
```

> Next: You can shorten functions, too. [Next](#function-shorthand)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Function shorthand

JavaScript lets you define properties as functions.

```js
App = {
  start: function () { /*...*/ }
}
```

```js
App.start()
```

---

In ES2015, you can shorten this.

```js
App = {
  /*{*/start ()/*}*/ { /*...*/ }
}
```

> Next: Learn about getters and setters. [Next](#getters-and-setters)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Getters and setters

Apart from function shorthands, you can define special attributes that do something when read or set.

```js
Shop = {
  /*{*/get closed ()/*}*/ {
    return this.status === 'closed'
  },
  /*{*/set closed (value)/*}*/ {
    this.status = value ? 'closed' : 'open'
  }
}
```

```js
Shop.closed = true  // invokes `set closed()`
Shop.status         //=> 'closed'
Shop.closed         //=> true (invokes `get closed()`)
```

> Also see: [get (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)

<!-- -->

> Next: Learn about writing dynamic property names. [Next](#computed-properties)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Computed names

You can write properties with key names derived from expressions.

```js
let id = 'john'
let Users = { /*{*/[id]/*}*/: "John Frobisher" }
Users.john //=> "John Frobisher"
```

---

You would've written it like the long way in ES5:

```js
var id = 'john'
var Users = {}
Users[id] = "John Frobisher"
```

---

This works with the other function shorthands, too. This example creates a function `gettitle()`.

```js
var key = 'title'
App = {
  /*{*/['get' + key]()/*}*/ { return this[key] }
}
```

> Next: Let's recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Recap

ES2015 offers some shorthand for writing object
[Names](#name-shorthand),
[Functions](#functions-shorthand),
[Getters and setters](#getters-and-setters), and
[Computed](#computed-properties) properties.

```js
App = {
  // Names
  /*{*/handler/*}*/,

  // Functions
  /*{*/start ()/*}*/ { return this.go() },

  // Getters and setters
  /*{*/get closed ()/*}*/ { return this.status === 'closed' },
  /*{*/set closed (val)/*}*/ { this.status = val ? 'closed' : 'open' },

  // Computed names
  /*{*/[ 'prop_' + n ]/*}*/: 42
}
```

> Next: Let's learn about classes. [Next](./classes)
