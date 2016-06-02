# Constants

`const` is just like `let`, except you can't modify its contents.

```js
function greet (user) {
  const name = user.name
  const name = 'Mr. ' + user.name // <-- Error
  console.log('Hello, ' + name)
}
```

-

> Learn what's new with strings. [Continue >](template-strings.md)
