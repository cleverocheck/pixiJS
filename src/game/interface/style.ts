import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Roboto', sans-serif;
    }
`

const PixiCanvasBlock = styled.div`
    width: 512px;
    height: 512px;
    position: relative;
`

const GameInfo = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    background: #0000009d;
    color: #fff;
`

const GameInterfaceBlock = styled.div`
    position: absolute;
    right: 32px;
    bottom: 0;
    left: 32px;
    height: 32px;
    display: flex;
    justify-content: space-between;
`

const HeartBlock = styled.div`
    display: flex;
    align-items: center;
`

const Heart = styled.img`
    height: 24px;
    width: 24px;
    margin-left: 5px;
`

const ChestBlock = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
    color: #fff;
`

const Chest = styled.img`
    height: 24px;
    width: 28px;
    margin-right: 24px;
`

export { GlobalStyle, PixiCanvasBlock, GameInfo, GameInterfaceBlock, HeartBlock, Heart, ChestBlock, Chest }