# Constructors

When you have a method with the name `constructor`, it will be called when doing `new YourClass(...)`.

```js
class Circle {
  constructor (radius) {
    this.radius = radius
  }
}

c = new Circle(10.5)
c.radius  //=> 10.5
```

-

> What about static methods? [Continue >](static-methods.md)
