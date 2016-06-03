# Stores

Think of a store as a bunch of data.

```js
var album = {
  title: 'Kind of Blue',
  artist: 'Miles Davis'
  year: 1959
}
```

In fact, you may have already done this: the example above is a plain JS object that stores data.

```js
console.log(album.title)  // <- Read
album.genre = 'Jazz'      // <- Write
```

You can read and write data into a plain JS object. You can do the same in Redux, but just a little differently.

-

> How would you do that in Redux? [Continue >](our-first-store.md)
