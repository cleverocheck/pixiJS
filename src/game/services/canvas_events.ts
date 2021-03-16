interface app_stage_type {
    height: number
}

interface sprite_type {
    x: number
    y: number
    height: number
    width: number
}

type contain_response_type = 'top' | 'top-left' | 'top-right' | 'left' | 'right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'none'

const centrize_object = (app_stage: app_stage_type, sprite: sprite_type): void => {
    sprite.y = app_stage.height / 2 - sprite.height / 2
}

const hit_sprites = (sprite_1: sprite_type, sprite_2: sprite_type): boolean => {
    let half_all_width = (sprite_1.width + sprite_2.width) / 2
    let half_all_height = (sprite_1.height + sprite_2.height) / 2
    let difference_horizontal = (sprite_1.x + sprite_1.width / 2) - (sprite_2.x + sprite_2.width / 2)
    let difference_vertical = (sprite_1.y + sprite_1.height / 2) - (sprite_2.y + sprite_2.height / 2)

    if (Math.abs(difference_horizontal) < half_all_width) {
        if (Math.abs(difference_vertical) < half_all_height) return true
        else return false
    } else {
        return false
    }
}

const contain = (sprite: sprite_type, container: sprite_type): contain_response_type => {
    let collision: contain_response_type = 'none'
    if (sprite.y < container.y) {
        sprite.y = container.y
        collision = 'top'
    }
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height
        collision = 'bottom'
    }
    if (sprite.x < container.x) {
        sprite.x = container.x
        if (collision === 'bottom' || collision === 'top') {
            if (collision === 'bottom') collision = 'bottom-left'
            if (collision === 'top') collision = 'top-left'
        } else collision = 'left'
    }
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width
        if (collision === 'bottom' || collision === 'top') {
            if (collision === 'bottom') collision = 'bottom-right'
            if (collision === 'top') collision = 'top-right'
        } else collision = 'right'
    }
    return collision
}

export {
    centrize_object,
    hit_sprites,
    contain
}