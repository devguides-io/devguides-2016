# Static methods

You can define functions that can be called without instanciating it (calling `new YourClass`). These are called static methods.

```js
class Circle {
  static createFromDiameter (diameter) {
    return new Circle(diameter / 2)
  }
}

c = Circle.createFromDiameter(21)
// Same as `new Circle(10.5)`
```

-

> Let's learn about inheritance. [Continue >](inheritance.md)
