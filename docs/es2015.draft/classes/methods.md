# Methods

You can write methods similar to the object function shorthand. Note that there are no commas, unlike objects!

```js
class Circle {
  getArea () {
    return Math.PI * this.radius * this.radius
  }
  getCircumference () {
    return Math.PI * 2 * this.radius
  }
}
```

-

> What about constructors? [Continue >](constructors.md)
