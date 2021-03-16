import { combineReducers } from 'redux'

import global from './global'
import { initialState_global_type } from '../actions/global/types'

export interface reducers_total {
    global: initialState_global_type
}

export default combineReducers({
    global: global
})
