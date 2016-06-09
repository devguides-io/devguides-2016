---
layout: _layouts/chapter.jade
book: ES2015
chapter: Variables
---

# Let

`let` works just like `var`. In most cases, you can use `let` instead of var.

```js
function greet (user) {
  /*{*/let name = user.name/*}*/
  console.log('Hello, ' + name)
}
```

> Next: But what makes it different? [Next](#let-vs-var)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# let vs. var

A `let` is only available inside the `{ ... }` block they're in.
In this example, the `name`s are only available inside their respective *if* and *else* blocks.

<!-- example: examples/variables-let -->

> Also see: [Block scope (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

<!-- -->

> Next: Learn about `let`'s cousin. [Next](#constants)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Constants

`const` is just like *let*, except you can't reassign it to a new value.
Most guides now recommend using *let* and *const* instead of `var`.

<!-- example: examples/variables-const -->

> Also see: [Constants (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

<!-- -->

> Next: What is block scoping? [Next](#block-scoping)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Block scoping

`let` and `const` are said to be *block scoping.* In JavaScript, a block is code inside `{` and `}`. These variables are only available inside their blocks.

<!-- example: examples/variables-scoping -->

> The 2nd `msg` is only available inside the *if* block.

---

Block scoping affects other kinds of blocks.

```js
function greet () { /*...*/ }
if (hidden) { /*...*/ }
else { /*...*/ }
try { /*...*/ }
catch (e) { /*...*/ }
finally { /*...*/ }
switch (state) { /*...*/ }
for (;;) { /*...*/ }
while (true) { /*...*/ }
```

> Also see: [Blocks (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)

<!-- -->

> Next: What about blocks inside blocks? [Next](#nested-blocks)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Nested blocks

Variables defined using `let` and `const` are available only inside `{...}` blocks, and other blocks inside them.

```js
function run (user) {
  if (user) {
    /*{*/let running = user.state === 'running'/*}*/
    if (running) {
      /// `running` is still available here
    } else {
      /// and here, too
    }
  } else {
    //! but not here!
  }
}
```

> Next: Learn recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Recap

`let` is the new `var`. `const` is the same, but doesn't let you change it.

```js
let a = 'hello'
const b = 'hi'
```

---

They are *block scoping*: they are only available within `{...}` blocks, but not outside them.

```js
if (true) {
  let a = 'hello'
}
console.log(a)  //! undefined
```

> Next: Learn what's new with objects. [Next](objects)
