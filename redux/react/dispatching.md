# Dispatching

`connect()` also lets you send *props* to your Components that map to dispatch calls. The 2nd argument of `connect()` lets you do this.

```js
var PhotosList = connect(mapState, mapDispatch)(PhotosList)
//                                 ^---------^
```

Provide it a function that returns properties to be added to your component. These properties are functions that you can call later on.

```js
function mapDispatch (dispatch) {
  return {
    onPublishClick: function () {
      dispatch({ type: 'PUBLISH' })
    }
  }
}
```

These properties will be available in `props` in your component. You can then call them on certain events like *onClick*.

```js
<button onClick={() => this.props.onTodoClick()}>
//                     ^--------------------^
```

-

> Let's recap what we've learned. [Continue >](recap.md)
