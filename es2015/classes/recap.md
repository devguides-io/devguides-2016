# Recap

```js
class Circle extends Shape {
  constructor (radius) {
    this.radius = radius
  }

  // Methods
  getArea () { return Math.PI * 2 * this.radius }

  // Static methods
  static createFromDiameter (d) { return new Circle(d / 2) }
}

c = new Circle(10)
```

-

> How do you define methods? [Continue >](methods.md)
