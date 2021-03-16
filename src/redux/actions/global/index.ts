import {
    CHANGE_APP_STATE,
    CHANGE_DAMAGE_EXPLORER,
    START_DRAG_EXPLORER,
    END_DRAG_EXPLORER
} from './actions'

import {
    change_app_state_input_data,
    change_app_state_out_data,
    change_damage_explorer_input_data,
    change_damage_explorer_out_data,
    start_drag_chest_input_data,
    start_drag_chest_out_data,
    end_drag_chest_input_data,
    end_drag_chest_out_data
} from './types'

export const change_app_state = (data: change_app_state_input_data): change_app_state_out_data => ({
    type: CHANGE_APP_STATE,
    data: data.type
})

export const change_damage_explorer = (data: change_damage_explorer_input_data): change_damage_explorer_out_data => ({
    type: CHANGE_DAMAGE_EXPLORER,
    data: data.sprite
})

export const start_drag_chest = (data: start_drag_chest_input_data): start_drag_chest_out_data => ({
    type: START_DRAG_EXPLORER,
    data: data
})

export const end_drag_chest = (data: end_drag_chest_input_data): end_drag_chest_out_data => ({
    type: END_DRAG_EXPLORER,
    data: data
})