# Connecting to the store

react-redux provides `connect()` to let components see the store's state.

```js
import { connect } from 'redux'

PhotosList = React.createClass({ /*...*/ })
PhotosList = connect(mapState)(PhotosList)
//           ^---------------^
```

What's `mapState`? It takes the `state` and returns props to be used by the component. Write this function and pass it to *connect()*.

```js
function mapState (state) {
  return { photos: state.photos }
}
```

You can use the props you made in *mapState()* inside your component as `this.props`.

```js
var PhotosList = React.createClass({
  render () {
    let photos = this.props.photos
    //           ^---------------^
    return <div>{photos.map(/*...*/)}</div>
  }
})
```

-

> What about dispatching events? [Continue >](dispatching.md)
