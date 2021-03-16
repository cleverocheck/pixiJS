import {
    CHANGE_APP_STATE,
    CHANGE_DAMAGE_EXPLORER,
    START_DRAG_EXPLORER,
    END_DRAG_EXPLORER
} from '../actions/global/actions'

import { initialState_global_type } from '../actions/global/types'

const initialState: initialState_global_type = {
    app_state: 'loading',
    damage_explorer: false,
    drag_explorer: false,
    hp: 3,
    score: 0 // для победы нужно собрать 3 сундука
}

interface action_type {
    type: string
    data: any
}

const global = (state: initialState_global_type = initialState, action: action_type) => {
    switch (action.type) {
        case CHANGE_APP_STATE:
            return {
                ...state,
                app_state: action.data
            }
        case CHANGE_DAMAGE_EXPLORER:
            if (state.damage_explorer) {
                action.data.alpha = 1
                return {
                    ...state,
                    damage_explorer: false
                }
            } else if (state.hp - 1 === 0) {
                return {
                    ...state,
                    damage_explorer: true,
                    app_state: 'lose'
                }
            }
            else {
                action.data.alpha = 0.5
                return {
                    ...state,
                    damage_explorer: true,
                    hp: state.hp - 1
                }
            }
        case START_DRAG_EXPLORER:
            action.data.chest.position.set(-4, 20)
            action.data.explorer.addChild(action.data.chest)
            return {
                ...state,
                drag_explorer: true
            }
        case END_DRAG_EXPLORER:
            if (state.score + 1 === 3) {
                return {
                    ...state,
                    drag_explorer: false,
                    score: state.score + 1,
                    app_state: 'won'
                }
            } else return {
                ...state,
                drag_explorer: false,
                score: state.score + 1
            }

        default:
            return state
    }
}

export default global