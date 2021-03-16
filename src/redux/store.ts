import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers/index'

export default (initialState => createStore(reducers, initialState, composeWithDevTools()))()
