# Simple action creators

Action creators don't have to only be for asynchronous actions.

```js
//# actions.js
export function publishProject (id) {
  return { type: 'PROJECT_UPDATE', id, published: true }
}
```

> ↳ Even simple actions can have action creators.

-

> Let's recap what we've learned. [Continue >](recap.md)
