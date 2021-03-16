import { FC } from 'react'
import { useSelector } from 'react-redux'

import { GlobalStyle, PixiCanvasBlock, GameInfo, GameInterfaceBlock, HeartBlock, Heart, ChestBlock, Chest } from './style'

import { app_state_type } from '../../redux/actions/global/types'
import { reducers_total } from '../../redux/reducers/index'

const GameInterface: FC = () => {
    const app_state = useSelector<reducers_total, app_state_type>(({ global }) => global.app_state)
    const hp = useSelector<reducers_total, number>(({ global }) => global.hp)
    const score = useSelector<reducers_total, number>(({ global }) => global.score)

    return (
        <PixiCanvasBlock id='pixi'>
            <GlobalStyle />
            {app_state === 'press_any_key' &&
                <GameInfo>
                    Press any arrow key to start
                </GameInfo>}
            {app_state === 'lose' &&
                <GameInfo>
                    Game over!
                </GameInfo>}
            {app_state === 'won' &&
                <GameInfo>
                    You won!
                </GameInfo>}
            {app_state === 'play' && <GameInterfaceBlock>
                <ChestBlock >
                    <Chest src='/chest.png' />
                    {score} / 3
                </ChestBlock>
                <HeartBlock>
                    <Heart src={hp >= 1 ? '/heart.png' : '/heart_lost.png'} />
                    <Heart src={hp >= 2 ? '/heart.png' : '/heart_lost.png'} />
                    <Heart src={hp === 3 ? '/heart.png' : '/heart_lost.png'} />
                </HeartBlock>
            </GameInterfaceBlock>}
        </PixiCanvasBlock>
    )
}

export default GameInterface