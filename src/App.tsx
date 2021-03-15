import { FC, useEffect } from 'react'
import * as PIXI from 'pixi.js'

const App: FC = () => {

    useEffect(() => {

        // Хелперы

        interface key_type {
            value: any
            isDown: boolean
            isUp: boolean
            press: undefined | (() => void)
            release: undefined | (() => void)
            unsubscribe: () => void
        }

        const keyboard_events = (key_value: string): key_type => {

            const down_handler = (e: KeyboardEvent) => {
                if (e.key === key_value) {
                    if (key.isUp && key.press) key.press()
                    key.isDown = true
                    key.isUp = false
                    e.preventDefault()
                }
            }

            const up_handler = (e: KeyboardEvent) => {
                if (e.key === key_value) {
                    if (key.isDown && key.release) key.release()
                    key.isDown = false
                    key.isUp = true
                    e.preventDefault()
                }
            }

            let key: key_type = {
                value: key_value,
                isDown: false,
                isUp: true,
                press: undefined,
                release: undefined,
                unsubscribe: () => {
                    window.removeEventListener('keydown', down_handler)
                    window.removeEventListener('keyup', up_handler)
                }
            }

            window.addEventListener('keydown', down_handler)
            window.addEventListener('keyup', up_handler)

            return key
        }

        const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

        const centrize_object = (texture: any): void => {
            texture.y = app.stage.height / 2 - texture.height / 2
        }

        // Сама игра

        let state: undefined | ((delta: number) => void)

        const game_loop = (delta: number) => {
            state && state(delta)
        }

        let app = new PIXI.Application({
            width: 512,
            height: 512
        })

        let canvas_container = document.querySelector('#pixi') as HTMLDivElement
        canvas_container.appendChild(app.view)

        const loader = new PIXI.Loader()

        const setup = (loader: any, resources: any): void => {

            let tileset = resources['/blob.json'].textures

            let dungeon = new PIXI.Sprite(tileset['dungeon.png'])

            app.stage.addChild(dungeon)
            let door = new PIXI.Sprite(tileset['door.png'])

            door.position.set(32, 0)
            app.stage.addChild(door)


            let explorer = new PIXI.Sprite(tileset['explorer.png']) as any

            explorer.vx = 0
            explorer.vy = 0

            explorer.x = 68
            centrize_object(explorer)
            app.stage.addChild(explorer)

            let chest = new PIXI.Sprite(tileset['treasure.png'])

            chest.x = app.stage.width - chest.width - 68
            centrize_object(chest)
            app.stage.addChild(chest)

            let number_monsters = 6,
                spacing = 48,
                x_set = 150

            for (let i = 0; i < number_monsters; i++) {
                let monster = new PIXI.Sprite(tileset['blob.png'])

                let x = spacing * i + x_set
                let y = randomInt(0, app.stage.height - monster.height)
                monster.position.set(x, y)

                app.stage.addChild(monster)
            }

            let left = keyboard_events('a'),
                up = keyboard_events('w'),
                right = keyboard_events('d'),
                down = keyboard_events('s')

            left.press = () => {
                explorer.vx = -5
                explorer.vy = 0
            }

            left.release = () => {
                if (!right.isDown && explorer.vy === 0) {
                    explorer.vx = 0
                }
            }

            up.press = () => {
                explorer.vy = -5
                explorer.vx = 0
            }

            up.release = () => {
                if (!down.isDown && explorer.vx === 0) {
                    explorer.vy = 0
                }
            }

            right.press = () => {
                explorer.vx = 5
                explorer.vy = 0
            }
            right.release = () => {
                if (!left.isDown && explorer.vy === 0) {
                    explorer.vx = 0
                }
            }

            down.press = () => {
                explorer.vy = 5
                explorer.vx = 0
            }
            down.release = () => {
                if (!up.isDown && explorer.vx === 0) {
                    explorer.vy = 0
                }
            }

            interface element_type {
                x: number
                y: number
                width: number
                height: number
            }

            const contain = (sprite: element_type, container: element_type) => {
                if (sprite.x < container.x) {
                    sprite.x = container.x
                }
                if (sprite.y < container.y) {
                    sprite.y = container.y
                }

                if (sprite.x + sprite.width > container.width) {
                    sprite.x = container.width - sprite.width
                }
                if (sprite.y + sprite.height > container.height) {
                    sprite.y = container.height - sprite.height
                }
            }

            const play = (delta: number) => {
                explorer.x += explorer.vx * delta
                explorer.y += explorer.vy * delta
                contain(explorer, { x: 28, y: 10, width: 488, height: 480 })
            }

            state = play

            app.ticker.add((delta: number) => game_loop(delta))
        }

        loader.add('/blob.json').load(setup)

    }, [])

    return (
        <div id='pixi' />
    )
}

export default App