export type app_state_type = 'won' | 'lose' | 'press_any_key' | 'play' | 'loading'

export interface initialState_global_type {
    app_state: app_state_type
    damage_explorer: boolean
    drag_explorer: boolean
    hp: number
    score: number
}

export type change_app_state_input_data = {
    type: app_state_type
}

export interface change_app_state_out_data {
    type: string
    data: app_state_type
}

export interface change_damage_explorer_input_data {
    sprite: {
        alpha: number
    }
}

export interface change_damage_explorer_out_data {
    type: string
    data: {
        alpha: number
    }
}

export interface start_drag_chest_input_data {
    chest: object
    explorer: object
}

export interface start_drag_chest_out_data {
    type: string
    data: {
        chest: object
        explorer: object
    }
}

export interface end_drag_chest_input_data {
    explorer: object
}

export interface end_drag_chest_out_data {
    type: string
    data: {
        explorer: object
    }
}
