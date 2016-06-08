---
layout: _layouts/chapter.jade
book: ES2015
chapter: Functions
---

# Arrow functions

In ES2015, you can now write functions with the `=>` syntax, known as arrow functions.

```js
const greet = (name) => {
  console.log(`Hello, ${name}`)
}
```

---

For the most part, that's is the same as these examples that you would write in ES5.

```js
var greet = function (name) {
  console.log('Hello, ' + name)
}
// ---
function greet (name) {
  console.log('Hello, ' + name)
}
```

> Next: But what makes them different? [Next](#)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# This

When using `this` inside arrow functions, they take whatever's the value of `this` from its parent scope.

```js
addItems: function (items) {
  this.show()
  items.forEach((item) => {
    /*{*/this/*}*/.append(item)
  })
}
```

In this example, both instances of `this` refer to the same object.

---

In ES5, you may have worked around this by keeping track of `this` yourself. If you didn't, `this.append()` will likely throw an error.


```js
addItems: function (items) {
  this.show()
  /*{*/var self = this/*}*/
  items.forEach(function (item) {
    //! Without arrow functions, `this` means something else here.
    self.append(item)
  })
}
```

> Next: How else are arrow functions useful? [Next](#)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Short syntax

You can omit the curly braces. If you do, it implicitly returns the expression following the arrow.
All these lines do the same thing.

```js
list.map(n => Math.sqrt(n))
// ---
list.map(n => /*{*/{ return/*}*/ Math.sqrt(n) /*{*/}/*}*/)
list.map(function (n) { return Math.sqrt(n) }) //! In ES5
```

> Useful for functions like `map` and `reduce`.

---

You may have noticed we omitted the parentheses as well. You can do this if your function only takes in one argument. It makes no difference.

```js
list.map(n => Math.sqrt(n))
list.map(/*{*/(n)/*}*/ => Math.sqrt(n))
```

> These two are the same.

```js
list.reduce(a, b => a + b)   //! Error
list.reduce((a, b) => a + b) //! OK
```

> It only works if you have one argument.

<!-- -->

> Next: What else is it useful for? [Next](#)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Currying

You can take advantage of the short syntax to return functions. This is often called *currying.* In this example, we make a function, that returns a function, that returns a function.

```js
const logger = next => dispatch => action => {
  dispatch(action)
}
// ---
logger(next)(store.dispatch)({ type: 'init '})
```

> This is how [Redux middleware](../redux/middleware) are built.

