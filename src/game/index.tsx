import * as PIXI from 'pixi.js'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import GameInterface from './interface/index'
import { centrize_object, contain, hit_sprites } from './services/canvas_events'
import { keyboard_listen_event, wait_any_key_press } from './services/keyboard_events'
import { spawn_monsters, spawn_chest } from './services/spawn'

import store from '../redux/store'
import { change_app_state, change_damage_explorer, start_drag_chest, end_drag_chest } from '../redux/actions/global/index'

const GameComponent: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        PIXI.utils.skipHello()

        let app = new PIXI.Application({
            width: 512,
            height: 512,
            backgroundColor: 0xFFFFFF
        })

        let canvas_container = document.querySelector('#pixi') as HTMLDivElement
        canvas_container.appendChild(app.view)

        const loader = new PIXI.Loader()

        const setup = (loader: any, resources: any): void => {
            let tileset = resources['/tilesets/tileset.json'].textures

            let dungeon = new PIXI.Sprite(tileset['dungeon.png'])
            app.stage.addChild(dungeon)

            let door = new PIXI.Sprite(tileset['door.png'])
            door.position.set(32, 0)
            app.stage.addChild(door)

            let explorer = new PIXI.Container() as any
            let explorer_human = new PIXI.Sprite(tileset['explorer.png'])

            explorer.vx = 0
            explorer.vy = 0
            explorer.x = 64
            explorer.addChild(explorer_human)
            centrize_object(app.stage, explorer)

            app.stage.addChild(explorer)

            let object_min_x = 100

            let chest = spawn_chest(tileset, app, object_min_x)
            app.stage.addChild(chest)

            interface monster_type {
                sprite: any
                speed: number
            }

            let monsters_arr: monster_type[] = spawn_monsters(tileset, app, object_min_x)

            let left = keyboard_listen_event('ArrowLeft')
            let up = keyboard_listen_event('ArrowUp')
            let right = keyboard_listen_event('ArrowRight')
            let down = keyboard_listen_event('ArrowDown')

            left.press = () => {
                explorer.vx = -5
                explorer.vy = 0
            }

            up.press = () => {
                explorer.vy = -5
                explorer.vx = 0
            }

            right.press = () => {
                explorer.vx = 5
                explorer.vy = 0
            }

            down.press = () => {
                explorer.vy = 5
                explorer.vx = 0
            }

            const play = (delta: number): void => {
                explorer.x += explorer.vx * delta
                explorer.y += explorer.vy * delta
                contain(explorer, { x: 28, y: 10, width: 488, height: 480 })

                if (hit_sprites(chest, explorer) && !store.getState().global.drag_explorer) {
                    dispatch(start_drag_chest({ chest: chest, explorer: explorer }))
                }

                if (hit_sprites(door, explorer) && store.getState().global.drag_explorer) {
                    dispatch(end_drag_chest({ explorer: explorer }))
                    if (store.getState().global.app_state == 'play') {
                        explorer.removeChild(chest)
                        chest = spawn_chest(tileset, app, object_min_x)

                        app.stage.addChild(chest)
                    }
                }

                for (let monster of monsters_arr) {
                    let monster_sprite = monster.sprite
                    if (hit_sprites(monster_sprite, explorer) && !store.getState().global.damage_explorer) {
                        dispatch(change_damage_explorer({ sprite: explorer_human }))
                        setTimeout(() => {
                            dispatch(change_damage_explorer({ sprite: explorer_human }))
                        }, 1000)
                    }
                    monster_sprite.x += monster_sprite.vx * delta
                    monster_sprite.y += monster_sprite.vy * delta

                    let collision = contain(monster_sprite, { x: 28, y: 10, width: 488, height: 480 })
                    switch (collision) {
                        case 'top':
                            monster_sprite.vy = monster.speed
                            break
                        case 'bottom':
                            monster_sprite.vy = -monster.speed
                            break
                        case 'left':
                            monster_sprite.vx = monster.speed
                            break
                        case 'bottom-left':
                            monster_sprite.vx = -monster.speed
                            monster_sprite.vy = -monster.speed
                            break
                        case 'bottom-right':
                            monster_sprite.vx = -monster.speed
                            monster_sprite.vy = -monster.speed
                            break
                        case 'top-left':
                            monster_sprite.vx = monster.speed
                            monster_sprite.vy = monster.speed
                            break
                        case 'top-right':
                            monster_sprite.vx = monster.speed
                            monster_sprite.vy = monster.speed
                            break
                        case 'right':
                            monster_sprite.vx = -monster.speed
                            break
                    }
                }
            }

            const game_loop = (delta: number): void => {
                if (store.getState().global.app_state === 'play') play(delta)
            }

            dispatch(change_app_state({ type: 'press_any_key' }))
            wait_any_key_press(['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'], () => {
                dispatch(change_app_state({ type: 'play' }))
            })
            app.ticker.add(game_loop)
        }

        loader.add('/tilesets/tileset.json').load(setup)
    }, [])

    return <GameInterface />
}

export default GameComponent