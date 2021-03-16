import * as PIXI from 'pixi.js'
import { random_int } from './random'

interface monster_type {
    sprite: any
    speed: number
}

const spawn_monsters = (tileset: any, app: any, object_min_x: number): monster_type[] => {
    let monsters_arr = []
    let number_monsters = 6
    let spacing = 64

    for (let i = 0; i < number_monsters; i++) {
        let monster_sprite = new PIXI.Sprite(tileset['blob.png']) as any

        let x = spacing * i + object_min_x
        let y = random_int(10, app.stage.height - monster_sprite.height)
        let speed = random_int(2, 4)

        if (y > app.stage.width - 40 - monster_sprite.height) y = app.stage.width - 40 - monster_sprite.height

        if (y < app.stage.width / 2) monster_sprite.vy = speed
        else monster_sprite.vy = -speed

        if (x < app.stage.height / 2) monster_sprite.vx = speed
        else monster_sprite.vx = -speed

        monster_sprite.position.set(x, y)

        monsters_arr.push({ sprite: monster_sprite, speed: speed })
        app.stage.addChild(monster_sprite)
    }

    return monsters_arr
}

const spawn_chest = (tileset: any, app: any, object_min_x: number): any => {
    let chest = new PIXI.Sprite(tileset['chest.png'])

    chest.x = random_int(object_min_x, app.stage.width - 28 - chest.width)
    chest.y = random_int(chest.height + 28, app.stage.height - 28 - chest.height)

    return chest
}

export {
    spawn_monsters,
    spawn_chest
}