import { memo, useState } from 'react'
import ChessBoardGame from './ChessBoardGame'
import History from './History'
import PlayerInfo from './PlayerInfo'
import { HistoryData, Player, TurnData } from '@/utils/interface'

const ChessRoom = () => {
    const [playerWhiteInfo, setPlayerWhiteInfo] = useState<Player>({
        id: '',
        name: '',
        avatar: '',
        pieceColor: '',
        capturedPieces: [],
    })
    const [playerBlackInfo, setPlayerBlackInfo] = useState<Player>({
        id: '',
        name: '',
        avatar: '',
        pieceColor: '',
        capturedPieces: [],
    })
    const [historyData, setHistoryData] = useState<HistoryData[]>([])

    const historyDataOnchange = (data: TurnData[]) => {
        console.log(data)
        const formatData = data.reduce(
            (result: HistoryData[], cur, index, arr) => {
                if (index % 2 == 0) {
                    result.push({
                        w: cur,
                        b: arr[index + 1],
                    })
                }
                return result
            },
            [],
        )
        setHistoryData(formatData)
    }
    const pieceCapturedOnchange = (data: TurnData[]) => {
        const blackCaptured = data
            .filter((move) => move.captured && move.color == 'b')
            .map((move) => move.captured) as string[]
        const whiteCaptured = data
            .filter((move) => move.captured && move.color == 'w')
            .map((move) => move.captured) as string[]
        setPlayerBlackInfo({
            ...playerBlackInfo,
            capturedPieces: formatArray(blackCaptured),
        })
        setPlayerWhiteInfo({
            ...playerWhiteInfo,
            capturedPieces: formatArray(whiteCaptured),
        })
    }

    return (
        <div className='h-screen flex items-center justify-center bg-[#302E2B]'>
            <div className='flex flex-col'>
                <PlayerInfo
                    avatar={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_6sd0vYT4CtcPxu7m4PNxZ8CF90oWQyJ8su0k6WbTkw&s'
                    }
                    name={'Eck1'}
                    capturedPieces={playerBlackInfo.capturedPieces}
                    capturedPiecesColor={'#fff'}
                />
                <ChessBoardGame
                    historyDataOnchange={historyDataOnchange}
                    pieceCapturedOnchange={pieceCapturedOnchange}
                />
                <PlayerInfo
                    avatar={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_6sd0vYT4CtcPxu7m4PNxZ8CF90oWQyJ8su0k6WbTkw&s'
                    }
                    name={'Eck2'}
                    capturedPieces={playerWhiteInfo.capturedPieces}
                    capturedPiecesColor={'#000'}
                />
            </div>
            <div
                style={{
                    width: 'calc((100vw - 700px)/2)',
                }}
                className='h-full'
            >
                <History historyData={historyData} />
            </div>
        </div>
    )
}

export default memo(ChessRoom)
