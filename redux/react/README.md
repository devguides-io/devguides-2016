# Using with React

**react-redux** is the official package used to make Redux and React work together. [(docs)](http://redux.js.org/docs/basics/UsageWithReact.html) To use it, wrap your main app (your top-most React component) inside a `<Provider>`. This lets your components see the `store`.

```js
import React from 'react'                  // ...
import { render } from 'react-dom'         // ...
import { createStore } from 'redux'        // ...
import { Provider } from 'react-redux'

let store = createStore(todoApp)

render(
  <Provider store={store}>       //@
    <App />                      //@
  </Provider>,                   //@
  document.getElementById('root'))
```

-

> How do I see the state in my components? [Continue >](connecting.md)
