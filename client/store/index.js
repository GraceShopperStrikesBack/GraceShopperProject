import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleInventoryReducer from './singleInventory'
import allInventoryReducer from './allInventory'
import singleOrderReducer from './order'

export const reducer = combineReducers({
  user,
  singleInventory: singleInventoryReducer,
  inventory: allInventoryReducer,
  order: singleOrderReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
