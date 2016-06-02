# Compatibility

Classes are simply syntactic sugar over ES5's prototypes. In fact, these two are equivalent:

```js
class Circle {
  constructor (r) { this.radius = r }
  getDiameter () { return this.radius * 2 }
}
```

```js
function Circle (r) { this.radius = r }
Circle.prototype.getDiameter = function () { return this.r * 2 }
```

You can both use them like so:

```js
c = new Circle(20)
```

-

> Let's recap what we've learned. [Continue >](recap.md)
