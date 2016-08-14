---
layout: _layouts/chapter.jade
book: ES2015
chapter: Overview
next: variables
---

# ES2015

Here's an overview of what's new with ES2015 (previously known as ES6).

> Next: See what's new with variables. [Next](#variables)

* * * *

# Variables

[Block scoping:](variables) `let` is the new `var`. It respects a thing called "block scoping".

```js
function fn () {
  /*{*/let x = 0/*}*/
  if (true) {
    /*{*/let x = 1/*}*/ /*[ only inside this `if` ]*/
  }
}
```

----

[Constants](variables#constants) are variables that you can't modify.

```js
/*{*/const DAY = 86400/*}*/
```

> Also see: [ES2015: variables](variables)

<!-- -->

> Next: Learn about template strings. [Next](#strings)

* * * *

# Strings

[Template strings](strings) are surrounded by backticks. You can do interpolation with them.

```js
var message = /*{*/`Hello ${name}`/*}*/
```

----

[Multiline strings](strings) are also supported through backticks.

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

[New shorthand:](objects) there are now shorter syntaxes for getters, setters, and methods.

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

[Same-name properties](objects#name-shorthand) also get a new shorthand.

```js
/// Short for `{ start: start, reset: reset }`
module.exports = /*{*/{ start, reset }/*}*/
```

---

[Computed property names](objects#computed-names) let you make dynamic names.

```js
return {
  /*{*/[ 'prop_' + n ]/*}*/: 42
}
```

> Also see: [ES2015: Objects](objects)

<!-- -->

> Next: See new function features. [Next](#functions)

* * * *

# Functions

[Default](functions#default-arguments), [rest, and spread](functions#rest-and-spread) make dynamic arguments easier.

```js
function greet(/*{*/name = "Jerry"/*}*/) { /*...*/ }
function greet(/*{*/...names/*}*/) { /*...*/ }
// ---
greet(/*{*/...names/*}*/)
```

---

[Arrow functions](functions) preserve the lexical `this`.

```js
list.forEach(/*{*/item => {/*}*/
  this.addItem(item)
/*{*/}/*}*/)
```

---

[Short functions](functions#short-syntax): Omit the curly braces for short functions.

```js
list.map(/*{*/n => Math.PI * Math.sqrt(n)/*}*/)
```

> Also see: [ES2015: Functions](functions)

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

> Also see: [ES2015: Classes](classes)

<!-- -->

> Next: Extract variables through destructuring. [Next](#destructuring)

* * * *

# Destructuring

[Arrays](destructuring) can be destructured. [Spread](destructuring#spread) (`...`) can be used when destructuring arrays.

```js
const name = ['John', 'F', 'Kennedy'] //-
const /*{*/[first, middle, last]/*}*/ = name
const [first, /*{*/...others/*}*/] = name
```

---

[Objects](destructuring#objects) can be destructured. You can even assign them to new names.

```js
const name = { first: 'Jon', last: 'Snow' } //-
const /*{*/{ first, last }/*}*/ = name
const /*{*/{ first: firstName }/*}*/ = name
```

---

[Function arguments](destructuring#function-arguments) can also be destructured.

```js
function greet (/*{*/{name, greeting}/*}*/) {
  console.log(`${greeting}, ${name}!`) //-
} //-
```

> Also see: [ES2015: Destructuring](destructuring)

<!-- -->

> Next: Let's learn about importing and exporting. [Next](#modules)

* * * *

# Modules

[import](modules) is the new `require()`.

```js
import fs from 'fs'
var fs = require('fs') //-
```

```js
import { readFile } from 'fs'
var readFile = require('fs').readFile //-
```

---

[export](modules#exporting) is the new `module.exports`. You can export `default`, `function`, or `var`.

```js
export default start
module.exports = start //-
```

```js
export function start () { /*...*/ }
export var PI = 3.14159


exports.start = function () { ... } //-
exports.PI = 3.14159 //-
```

---

When mixing `export default` with other exports, `import` will fetch the default export. [This is different](modules#exporting-many) from the `require()` behavior.

```js
import Engine from './engine'      // <-- Gets `export default`
import { start } from './engine'   // <-- Gets `export function`


var Engine = require('./engine').default || require('./engine') //-
```

> Also see: [ES2015: Modules](modules)

<!-- -->

> Next: See what's new with variables. [Next](variables)
