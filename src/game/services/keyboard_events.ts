interface key_state_type {
    readonly key: string
    isDown: boolean
    press: () => void
    release: () => void
    readonly unsubscribe: () => void
}

const keyboard_listen_event = (key: string): key_state_type => {
    const key_down = (e: KeyboardEvent) => {
        if (e.key === key) {
            if (!key_state.isDown) key_state.press()
            key_state.isDown = true
            e.preventDefault()
        }
    }

    const key_up = (e: KeyboardEvent) => {
        if (e.key === key) {
            if (key_state.isDown) key_state.release()
            key_state.isDown = false
            e.preventDefault()
        }
    }

    let key_state: key_state_type = {
        key: key,
        isDown: false,
        press: () => null,
        release: () => null,
        unsubscribe: () => {
            window.removeEventListener('keydown', key_down)
            window.removeEventListener('keyup', key_up)
        }
    }

    window.addEventListener('keydown', key_down)
    window.addEventListener('keyup', key_up)

    return key_state
}

const wait_any_key_press = (keys_arr: string[], callback: () => void): void => {
    const key_listener = (e: KeyboardEvent) => {
        for (let key of keys_arr) {
            if (e.key === key) {
                window.removeEventListener('keydown', key_listener)
                callback()
                break
            }
        }
    }

    window.addEventListener('keydown', key_listener)
}

export {
    keyboard_listen_event,
    wait_any_key_press
}
