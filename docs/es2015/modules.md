---
layout: _layouts/chapter.jade
book: ES2015
chapter: Modules
# next: objects
---

# Modules

Use `import` as a substitute for *require()*. These two lines do the same thing in most cases.

```js
var fs = require('fs')    // --> ES5
import fs from 'fs'       /// ES2015
```

> Next: How can we import many things from a module? [Next](#destructuring)

* * * *

# Destructuring

You can also extract certain things from a module using [destructuring](destructuring).

```js
var readFile = require('fs').readFile    // --> ES5
import { readFile } from 'fs'            /// ES2015
```

---

You can also use the *assign to new name* destructuring syntax to extract things into new names.

```js
var openFile = require('fs').openFile    // --> ES5
import { open: openFile } from 'fs'      /// ES2015
```

> Next: Let's learn about hoisting. [Next](#hoisting)

* * * *

# Hoisting

If `import` appears on the top-level, but not at the top, they will be *hoisted* to the top.

```js
console.log(util.inspect('hello'))
import util from 'util'
// ---
// -- This will work as if the `import` was placed on top.
```

---

`import` can't be used inside a block (like a function), unlike *require()*.

```js
function openFile (file) { //-
  import fs from 'fs'  //!
  return fs.readFileSync(file) //-
} //-

// ---
//! Error: 'import' and 'export' may only appear at the top level.
```

> Next: How can we export? [Next](#exporting)

* * * *

# Exporting

Use `export default` as a substitute for assigning to `module.exports`.

```js
function start () { //-
  return 'Starting engines...' //-
} //-

module.exports = start  // --> ES5
export default start    /// ES2015
```

---

You can also export inline function definitions.
In fact, you can export any expression, not just functions!

```js
export default function () {
  return 'hello'
}
```

```js
export default {
  name: 'devguides',
  version: '1.0.0'
}
```

> Next: How can we export many things from one module? [Next](#named-exports)

* * * *

# Named exports

Use `export function` to export functions.<br>
Use `export var` to export variables.

```js
export function start () {
  return 'Vroom!' //-
}

export function stop () {
  return 'Skreech!' //-
}
```

```js
export var PI = 3.14159
```

---

You can then import named exports by the [destructuring](destructuring) syntax.

```js
import { start, stop } from './engine'

// --> You can also assign different names:
import { start as engineStart } from './engine'
```

Try not to mix `default` exports and named exports! Let's find out why in the next section.

> Next: Can we mix this with `export default`? [Next](#mixing-exports)

* * * *

# Mixing exports

You can mix `default` exports with named exports, but there are caveats.

```js
export default Engine

export function start () {
  /*...*/
}
```

---

__With a default export:__ Doing `import X from` will fetch the default export if it's available.

```js
import Engine from './engine'      // --> Gets `export default`
import { start } from './engine'   // --> Gets `export function`
```

---

__Without a default export:__ If there isn't a default export, it will return object with every named export.

```js
// --> If we didn't have a default export in engine.js:
import Engine from './engine'
Engine.start()
```

---

This is very different from `require()`! To emulate this behavior with require, you need to do this:

```js
// --> ES5 equivalent:
var Engine =
  require('./engine').default ||
  require('./engine')
```

<details>
<summary>Further reading...</summary>

- [Difference between default and named exports](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281) *(Stack Overflow)*
</details>

> Next: Let's recap what we've learned. [Next](#recap)

* * * *

# Recap

`import` is the new `require()`.

```js
import fs from 'fs'
var fs = require('fs') //-
```

```js
import { readFile } from 'fs'
var readFile = require('fs').readFile //-
```

---

`export` is the new `module.exports`. You can export `default`, `function`, or `var`.

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

When mixing `export default` with other exports, `import` will fetch the default export. This different from the `require()` behavior.

```js
import Engine from './engine'      // --> Gets `export default`
import { start } from './engine'   // --> Gets `export function`


var Engine = //-
  require('./engine').default || //-
  require('./engine') //-
```

> Next: That's all for now! [Back](.)
