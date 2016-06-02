# Tagged templates

Template strings can be "tagged" by putting a function before it.

```js
tpl `hello ${name}! I'm ${me}`
```

`tpl` is a function you write. It will be invoked like so:

```js
function tpl (strings, values) {
  strings //=> ['hello ', "! I'm", '']
  values  //=> [name, me]
}
```

While this is not used very often, it lets us write template engines.
