---
layout: _layouts/chapter.jade
book: ES2015
chapter: Classes
next: strings
---

# Classes

You can now write classes in ES2015. Classes let you define your own object types.

```js
/*{*/class Circle {/*}*/
  constructor (radius) {
    this.radius = radius
  }
  getArea () {
    return Math.PI * 2 * this.radius
  }
}
```

---

You create instances of classes using `new`. These instances have functions called *methods*, such as `getArea()` here.

```js
c = new Circle(2)
c.getArea()  //=> 12.56
```

> Also see: [Classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

<!-- -->

> Next: How do you define methods? [Next](#methods)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Methods

You can write methods similar to the object function shorthand. Note that there are no commas, unlike objects!

```js
class Circle {
  /*{*/getArea ()/*}*/ {
    return Math.PI * this.radius * this.radius
  }
  getCircumference () { //-
    return Math.PI * 2 * this.radius //-
  } //-
}
```

```js
c = new Circle(2)
c.getArea()  //=> 12.56
```

> Also see: [Methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods)

<!-- -->

> Next: What about constructors? [Next](#constructors)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Constructors

When you have a method with the name `constructor`, it will be called when doing `new YourClass(...)`.

```js
class Circle {
  /*{*/constructor (radius) {/*}*/
    this.radius = radius
  }
}
```

```js
c = new Circle(10.5)
c.radius  //=> 10.5
```

> Also see: [Constructors (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)

> Next: What about static methods? [Next](#static-methods)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Static methods

You can define functions that can be called without instanciating it (calling `new YourClass`). These are called static methods.

```js
class Circle {
  /*{*/static createFromDiameter (diameter) {/*}*/
    return new Circle(diameter / 2)
  }
}
```

```js
c = Circle.createFromDiameter(21)
/// Same as `new Circle(10.5)`
```

> Next: Let's learn about inheritance. [Next](#inheritance)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Inheritance

You can build on top of other classes using `extends`. This makes the methods of the parent class available in your class.

```js
class Shape {
  show () { /*...*/ }
  hide () { /*...*/ }
}
// ---
/*{*/class Circle extends Shape {/*}*/
  roll () { /*...*/ }
}
// ---
let c = new Circle()
c.show()
c.roll()
```

> Also see: [Sub classing (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends)

<!-- -->

> Next: How do I extend methods? [Continue](#compatibility)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Super

If you use the same method name in a subclass, in overrides what's in the parent class. To call methods from a class's parent, use `super`.

```js
class Logger {
  log (message) {
    console.log(message)
  }
}
// ---
class ErrorLogger extends Logger {
  log (message) {
    /*{*/super/*}*/('Error: ' + message)
  }
}
```

---

You can also use `super` for static methods, but it works a little differently.

```js
static log (message) {
  /*{*/super.log/*}*/('Error: ' + message)
}
```

> Also see: [super (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

<!-- -->

> Next: Are all these backward-compatible? [Continue](#compatibility)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Compatibility

Classes are simply syntactic sugar over ES5's prototypes. In fact, these two are equivalent.

```js
class Circle {
  constructor (r) { this.radius = r }
  getDiameter () { return this.radius * 2 }
}
// ---
function Circle (r) { this.radius = r }
Circle.prototype.getDiameter = function () { return this.r * 2 }
```

---

You can both use them in the same way.

```js
c = new Circle(20)
```

> Next: Let's recap what we've learned. [Next](#recap)

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

# Recap

ES2015 lets you write classes instead of dealing with prototypes.

```js
class Circle extends Shape {
  constructor (radius) {
    this.radius = radius
  }

  /// Methods:
  getArea () { return Math.PI * 2 * this.radius }

  /// Static methods:
  static createFromDiameter (d) { return new Circle(d / 2) }
}
```

```js
c = new Circle(10)
c = Circle.createFromDiameter(20)
c.getArea()
```

> Next: Let's learn about strings. [Next](strings)
