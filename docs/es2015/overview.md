---
layout: _layouts/chapter.jade
book: ES2015
chapter: Classes
next: variables
---

# ES2015

Here's an overview of what's new with ES2015 (previously known as ES6).

> Next: See what's new with variables. [Next](#variables)

* * * *

# Variables

**[Block scoping:](variables)** `let` is the new `var`. It respects a thing called "block scoping".

```js
function fn () {
  /*{*/let x = 0/*}*/
  if (true) {
    /*{*/let x = 1/*}*/ /*[ only inside this `if` ]*/
  }
}
```

----

**[Constants](variables)** are variables that you can't modify.

```js
/*{*/const DAY = 86400/*}*/
```

> Also see: [ES2015: variables](variables)

<!-- -->

> Next: Learn about template strings. [Next](#strings)

* * * *

# Strings

**[Template strings](strings)** are surrounded by backticks. You can do interpolation with them.

```js
var message = /*{*/`Hello ${name}`/*}*/
```

----

**[Multiline strings](strings)** are also supported through backticks.

```js
console.log(`
Usage:
  parse-csv [file]

Parses a CSV file.
`)
```

> Also see: [ES2015: Strings](strings)

<!-- -->

> Next: Write objects easier. [Next](#objects)

* * * *

# Objects

**[New shorthand:](objects)** there are now shorter syntaxes for getters, setters, and methods.

```js
App = {
  /// Functions:
  /*{*/start ()/*}*/ { return this.go() },

  /// Getters and setters:
  /*{*/get closed ()/*}*/ { return this.status === 'closed' },
  /*{*/set closed (val)/*}*/ { this.status = val ? 'closed' : 'open' },
}
```

---

**[Same-name properties](objects)** also get a new shorthand.

```js
/// Short for `{ start: start, reset: reset }`
module.exports = /*{*/{ start, reset }/*}*/
```

---

**[Computed property names](objects)** let you make dynamic names.

```js
return {
  /*{*/[ 'prop_' + n ]/*}*/: 42
}
```

> Also see: [Objects](objects)

<!-- -->

> Next: See new function features. [Next](#functions)

* * * *

# Functions

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
list.forEach(/*{*/item => {/*}*/
  this.addItem(item)
/*{*/}/*}*/)
```

---

**Short functions:** Omit the curly braces for short functions.

```js
list.map(/*{*/n => Math.PI * Math.sqrt(n)/*}*/)
```

> Also see: [Functions](functions)

<!-- -->

> Next: Write classes, not prototypes. [Next](#classes)

* * * *

# Classes

ES2015 lets you write [classes](classes) instead of dealing with prototypes.

```js
/*{*/class Circle extends Shape {/*}*/
  constructor (radius) {
    this.radius = radius
  }

  /// Methods:
  getArea () { return Math.PI * 2 * this.radius }

  /// Static methods:
  static createFromDiameter (d) { return new Circle(d / 2) }
}
```

```js
c = new Circle(10)
c = Circle.createFromDiameter(20)
c.getArea()
```

> Next: See what's new with variables. [Next](variables)
