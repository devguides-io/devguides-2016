# Inheritance

You can build on top of other classes using `extends`. This makes the methods of the parent class available in your class.

```js
class Shape {
  show () { /*...*/ }
  hide () { /*...*/ }
}

class Circle extends Shape {
  /*...*/
}

c = new Circle()
c.show()
```

-

> Are all these backward-compatible? [Continue >](compatibility.md)
