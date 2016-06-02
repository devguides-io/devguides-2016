# Stores

Think of Redux as a way to manage a store of data.

```js
var article = {
  title: 'Global Warming',
  published: false,
  body: /*...*/
}
```

In fact, you may have already done this: the example above is a plain JS object that stores data.

```js
console.log(article.title)  // <- Read
article.published = true    // <- Write
```

You can read and write data into a plain JS object. You can do the same in Redux, but just a little differently.

-

> How would you do that in Redux? [Continue >](our-first-store.md)
