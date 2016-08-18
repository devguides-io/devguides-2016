---
layout: _layouts/chapter.jade
book: ES2015
chapter: Overview
next: variables
---

# ES2015

Here's an overview of what's new with ES2015, previously known as ES6.

> Next: See what's new with variables. [Next](#variables)

* * * *

# Variables

__Block scoping:__ `let` is the new `var`. These variables are only available in their respective blocks.
[#](variables)

```js
function fn () {
  /*{*/let x = 0/*}*/
  if (true) {
    /*{*/let x = 1/*}*/ /*[ only inside this `if` ]*/
  }
}
```

----

__Constants__ are variables that you can't modify.
[#](variables#constants)

```js
/*{*/const DAY = 86400/*}*/
```

<details>
<summary>Further reading...</summary>

See the [ES2015: variables](variables) guide.
</details>

<!-- -->

> Next: Learn about template strings. [Next](#strings)

* * * *

# Strings

__Template strings__ are surrounded by backticks. You can do interpolation with them.
[#](strings)

```js
var message = /*{*/`Hello ${name}`/*}*/
```

----

__Multiline__ strings are also supported through backticks.
[#](strings)

```js
console.log(`
Usage:
  parse-csv [file]

Parses a CSV file.
`)
```

<details>
<summary>Further reading...</summary>

Learn more at the [ES2015: Strings](strings) guide.
</details>

> Next: Write objects easier. [Next](#objects)

* * * *

# Objects

__New shorthand:__ there are now shorter syntaxes for getters, setters, and methods.
[#](objects)

```js
App = {
  // --> Functions:
  /*{*/start ()/*}*/ { return this.go() },

  // --> Getters and setters:
  /*{*/get closed ()/*}*/ { return this.status === 'closed' },
  /*{*/set closed (val)/*}*/ { this.status = val ? 'closed' : 'open' },
}
```

---

__Same-name properties__ also get a new shorthand.
[#](objects#name-shorthand)

```js
// --> Short for `{ start: start, reset: reset }`
module.exports = /*{*/{ start, reset }/*}*/
```

---

__Computed property names__ let you make dynamic names.
[#](objects#computed-names)

```js
return {
  /*{*/[ 'prop_' + n ]/*}*/: 42
}
```

<details>
<summary>Further reading...</summary>

Learn more at the [ES2015: Objects](objects) guide.
</details>

> Next: See new function features. [Next](#functions)

* * * *

# Functions

__Default, rest and spread__ make dynamic arguments easier.
[#](functions#default-arguments)
[#](functions#rest-and-spread)

```js
function greet(/*{*/name = "Jerry"/*}*/) { /*...*/ }
function greet(/*{*/...names/*}*/) { /*...*/ }
// ---
greet(/*{*/...names/*}*/)
```

---

__Arrow functions__ preserve the lexical `this`.
[#](functions)

```js
list.forEach(/*{*/item => {/*}*/
  this.addItem(item)
/*{*/}/*}*/)
```

---

__Short functions:__ Omit the curly braces for short functions.
[#](functions#short-syntax)

```js
list.map(/*{*/n => Math.PI * Math.sqrt(n)/*}*/)
```

<details>
<summary>Further reading...</summary>

Learn more at the [ES2015: Functions](functions) guide.
</details>

> Next: Write classes, not prototypes. [Next](#classes)

* * * *

# Classes

ES2015 lets you write classes instead of dealing with prototypes.
[#](classes)

```js
/*{*/class Circle extends Shape {/*}*/
  constructor (radius) {
    this.radius = radius
  }

  // --> Methods:
  getArea () { return Math.PI * 2 * this.radius }

  // --> Static methods:
  static createFromDiameter (d) { return new Circle(d / 2) }
}
```

```js
c = new Circle(10)
c = Circle.createFromDiameter(20)
c.getArea()
```

<details>
<summary>Further reading...</summary>

Learn more at the [ES2015: Classes](classes) guide.
</details>

> Next: Extract variables through destructuring. [Next](#destructuring)

* * * *

# Destructuring

__Arrays__ can be destructured. The spread operator can be used when destructuring arrays.
[#](destructuring)

```js
const name = ['John', 'F', 'Kennedy'] //-
const /*{*/[first, middle, last]/*}*/ = name
const [first, /*{*/...others/*}*/] = name
```

---

__Objects__ can be destructured. You can even assign them to new names.
[#](destructuring#objects)

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

<details>
<summary>Further reading...</summary>

Learn more at the [ES2015: Destructuring](destructuring) guide.
</details>

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

When mixing `export default` with other exports, `import` will fetch the default export. [This is different](modules#named-exports) from the `require()` behavior.

```js
import Engine from './engine'      // <-- Gets `export default`
import { start } from './engine'   // <-- Gets `export function`


var Engine = require('./engine').default || require('./engine') //-
```

<details>
<summary>Further reading...</summary>

Learn more at the [ES2015: Modules](modules) guide.
</details>

> Next: See what's new with variables. [Next chapter](variables)
