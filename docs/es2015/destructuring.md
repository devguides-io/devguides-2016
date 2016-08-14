---
layout: _layouts/chapter.jade
book: ES2015
chapter: Destructuring
next: modules
---

# Destructuring

The new destructuring syntax lets you extract data from arrays and objects into their own variables.

```js
const name = ['John', 'F', 'Kennedy']
const /*{*/[first, middle, last]/*}*/ = name

console.log(first)    //=> 'John'
console.log(middle)   //=> 'F'
console.log(last)     //=> 'Kennedy'
```

---

This works great for swapping variables! No need for temporary variables.

```js
let [a, b] = [b, a]
```

> Also see: [Destructuring assignment (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

<!-- -->

> Next: What if there's more than 3 items? [Next](#spread)

* * * *

# Spread

You can use `...` to clump many arguments into on array.

```js
const countries = ['USA', 'Canada', 'Portugal']
const [usa, /*{*/...others/*}*/] = countries

console.log(usa)      //=> 'USA'
console.log(others)   //=> ['Canada', 'Portugal']
```

---

This works on the other side of `=` too! You can use the `...` syntax as part of an array literal. In fact, destructuring syntax was made so that they can be used as literals, too.

```js
const people = [leader, ...members]
```

> Also see: [Spread operator (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

<!-- -->

> Next: Let's try them on objects, too. [Next](#objects)

* * * *

# Objects

Destructuring works for objects, too.

```js
const album = {
  artist: 'Miles Davis',
  title: 'Kind of Blue'
}

const /*{*/{ artist, title }/*}*/ = album

console.log(artist)    //=> 'Miles Davis'
console.log(album)     //=> 'Kind of Blue'
```

---

```js
let a, b
({a, b} = {a:1, b:2})
```

When used outside of `let` (or `var` or `const`), you'll need to wrap them in parentheses.

<details>
<summary>Why?</summary>

The parentheses prevents `{a, b}` from being treated as a block statement. This is the same rule that prevents `{hi: 'world'};` from being a valid JS statement.
</details>

> Also see: [Destructuring assignment (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

<!-- -->

> Next: Let's use them outside assignments. [Next](#function-arguments)

* * * *

# Function arguments

Destructuring also works in function arguments. It's not just for assignments!

```js
function greet (/*{*/{name, greeting}/*}*/) {
  console.log(`${greeting}, ${name}!`)
}

greet({ greeting: 'Hello', name: 'John' })
//=> 'Hello, John!'
```

> Next: What if you want to change the name? [Next](#changing-names)

* * * *

# Changing names

Your variables don't need to have the same name as the object keys. You can extract a property into a different name.

```js
const name = {
  first: 'Sherlock',
  last: 'Holmes'
}

const { /*{*/first: firstName/*}*/ } = name
console.log(firstName)   //=> 'Sherlock'
```

<!-- {pre:.-light} -->

* * * *

# Default values

Use the default value syntax to set defaults in case a property doesn't exist.

```js
const song = {
  title: 'Across the Universe',
   artist: 'The Beatles'
}

const { /*{*/genre = 'Unknown'/*}*/ } = song

console.log(genre)
//=> 'Unknown'
```

> Next: What about objects inside objects? [Next](#deep-objects)

* * * *

# Deep objects

You can go down into nested objects with destructuring, too.

```js
const page = {
  uri: { domain: 'devguides.io', path: '/es2015' },
  title: 'ES2015 guides'
}

const { uri: /*{*/{domain}/*}*/ } = page

console.log(domain)
//=> 'devguides.io'
```

> Next: Let's recap what we've learned. [Next](#recap)

* * * *

# Recap

**Arrays** can be destructured. Spread (`...`) can be used when destructuring arrays.

```js
const name = ['John', 'F', 'Kennedy'] //-
const /*{*/[first, middle, last]/*}*/ = name
const [first, /*{*/...others/*}*/] = name
```

---

**Objects** can be destructured. You can even assign them to new names.

```js
const name = { first: 'Jon', last: 'Snow' } //-
const /*{*/{ first, last }/*}*/ = name
const /*{*/{ first: firstName }/*}*/ = name
```

---

**Function arguments** can also be destructured.

```js
function greet (/*{*/{name, greeting}/*}*/) {
  console.log(`${greeting}, ${name}!`) //-
} //-
```

> Next: Let's learn about import and export. [Next](#modules)
