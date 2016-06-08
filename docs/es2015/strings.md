---
layout: _layouts/chapter.jade
book: ES2015
chapter: Strings
---

# Template strings

You can use `${...}` to add expressions inside strings. To do this, surround your string with backticks.

```js
var message = `Hello ${name}`
```

---

Template strings are also used for multi-line strings.

```js
var help = `
Usage:
  $0 [options] [files...]
`
```

> Next: Why is it called a "template"? [Next](#tagged-templates)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Tagged templates

Template strings can be "tagged" by putting a function before it.

```js
tpl `hello ${name}! I'm ${me}`
```

---

`tpl` is a function you write. It will be invoked like so.
While this is not used very often, it lets us write things like template engines.

```js
function tpl (strings, values) {
  strings //=> ['hello ', "! I'm", '']
  values  //=> [name, me]
}
```

> Also see: [Tagged template literals (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals)

<!-- -->

> Next: Let's learn about what's new with functions. [Next](functions.html)
