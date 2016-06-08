# Classes

You can now write classes in ES2015.

```js
class Circle {
  constructor (radius) {
    this.radius = radius
  }
  getArea () {
    return Math.PI * 2 * this.radius
  }
}
```

Classes let you define your own object types. You create instances of them using `new`. These instances have functions called "methods," such as `getArea()` here.

```js
c = new Circle(20)
c.getArea() //=> 125.66
```

-

> How do you define methods? [Continue >](methods.md)
