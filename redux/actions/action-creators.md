# Action creators

In a typical app, we'll likely have a few of action creators. It's best to organize these into one file.

```js
//# actions.js
export function loadProject (id) {
  return function (dispatch) {
    dispatch({ type: 'PROJECT_LOADING', data })
    return API.get(`/projects/${id}`)
      .then(data => dispatch({ type: 'PROJECT_LOADED', data }))
      .catch(err => dispatch({ type: 'PROJECT_ERROR', err }))
  }
}

export function saveProject (id) { /*...*/ }
export function deleteProject (id) { /*...*/ }
export function createProject (id, data) { /*...*/ }
```

> ↳ We just built **action creators**: functions that create an action. `loadProject()` and friends return functions, which redux-thunk will happily accept as actions.

```
import { loadProject } from './actions'

store.dispatch(loadProject())
```

> ↳ You can invoke these actions by passing the functions' results to `dispatch()`.

-

> Let's build more action creators. [Continue >](simple-action-creators.md)
