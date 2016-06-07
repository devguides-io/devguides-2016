# Constants

`const` is just like *let*, except you can't reassign it to a new value

```js
function greet (user) {
  const name = user.name
  name = name.toUpperCase()
  //=> TypeError: Assignment to constant variable.
}
```

Most guides now recommend using *let* and *const* instead of `var`.

-

> What is block scoping? [Continue >](block-scoping.md)
