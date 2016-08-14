---
layout: _layouts/chapter.jade
book: ES2015
chapter: Functions
next: destructuring
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

> Also see: [Lexical this (Babel)](http://babeljs.io/docs/learn-es2015/#arrows)

<!-- -->

> Next: How else are arrow functions useful? [Next](#)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Short syntax

You can omit the curly braces. If you do, it implicitly returns the expression after the arrow.
All these lines do the same thing.

<!-- example: examples/functions-short -->

```js
list.map(n => /*{*/{ return/*}*/ Math.sqrt(n) /*{*/}/*}*/)
list.map(function (n) { return Math.sqrt(n) })
```

> Useful for functions like `map` and `reduce`.

---

You may have noticed we omitted the parentheses as well. You can do this if your function only takes in one argument. It makes no difference.

```js
/// These two are the same.
list.map(n => Math.sqrt(n))
list.map(/*{*/(n)/*}*/ => Math.sqrt(n))
```

```js
//! It only works if you have 1 argument.
list.reduce((a, b) => a + b)
list.reduce(a, b => a + b) //! Error
```


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
logger(next)(store.dispatch)({ type: 'init' })
```

> This is how [Redux middleware](../redux/middleware) are built.

<!-- -->

> Next: Set default arguments. [Next](#default-arguments)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Default arguments

You can now define defaults for arguments that are omitted.

```js
function greet(/*{*/name = "Jerry"/*}*/) {
  return `Hello ${name}`;
}
// ---
greet()        //=> "Hello, Jerry"
greet("Kyle")  //=> "Hello, Kyle"
```

> Next: Let's write functions with multiple arguments. [Next](#rest-and-spread)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Rest and spread

Write functions that take in multiple arguments by using the *rest* syntax.

```js
function greet(/*{*/...names/*}*/) {
  return `Hello ${names.join(', ')}!`;
}
// ---
greet('Moe', 'Larry', 'Curly')  /// Hello Moe, Larry, Curly!
```

---

Similarly, you can call functions with an array of arguments by using the *spread* syntax.

```js
let names = ['Moe', 'Larry', 'Curly']
// ---
greet(/*{*/...names/*}*/)  /// same as: `greet('Moe', 'Larry', 'Curly')`
```

> See also: [Spread operator (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

<!-- -->

> Next: Let's recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Recap

**Default, rest, and spread** make dynamic arguments easier.

```js
function greet(/*{*/name = "Jerry"/*}*/) { /*...*/ }
function greet(/*{*/...names/*}*/) { /*...*/ }
// ---
greet(/*{*/...names/*}*/)
```

---

**Arrow functions** preserve the lexical `this`.

```js
list.forEach(item => {
  this.addItem(item)
})
```

---

Omit the curly braces for short functions.

```js
list.map(n => Math.PI * Math.sqrt(n))
```

> Next: Let's learn about destructuring. [Next](destructuring)
