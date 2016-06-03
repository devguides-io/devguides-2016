# Recap

**react-redux** lets you make Redux and React work together. [(docs)](http://redux.js.org/docs/basics/UsageWithReact.html) `<Provider>` makes React components aware of a store.

```js
import { Provider } from 'react-redux'

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'))
```

`connect()` lets components communicate with a store.

```js
import { connect } from 'react-redux'

MyComponent = connect(mapState, mapDispatch)(MyComponent)
```

`mapState` should return props as taken from the state tree.

```js
function mapState (state) {
  return { photos: state.photos }
}
```

`mapDispatch` should return props that have functions to dispatch actions.

```js
function mapDispatch (dispatch) {
  return {
    onPublishClick: () => { dispatch({ type: 'PUBLISH' }) }
  }
}
```

These props are available in your components as `this.props`.

```js
<h1>{this.props.photos.map(/*...*/)}</h1>
//   ^---------------^
<button onClick={() => this.props.onPublishClick()}>
//                     ^-----------------------^
```

-

> Let's learn about redux middleware. [Continue >](../middleware/README.md)
