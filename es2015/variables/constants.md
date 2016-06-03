# Constants

`const` is just like *let*, except you can't modify its contents.

```js
function greet (user) {
  const name = user.name
  const name = name.toUpperCase()
  //=> TypeError: Identifier 'name' has already been declared
}
```

Most guides now recommend using *let* and *const* instead of `var`.

-

> What is block scoping? [Continue >](block-scoping.md)
