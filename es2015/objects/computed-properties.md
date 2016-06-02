# Computed properties

You can write properties with key names derived from expressions.

```js
let id = 'john'
let Users = { [id]: "John Frobisher" }
Users.john //=> "John Frobisher"
```

You would've written it like the long way in ES5:

```js
var id = 'john'
var Users = {}
Users[id] = "John Frobisher"
```

-

> Let's recap what we've learned. [Continue >](recap.md)
