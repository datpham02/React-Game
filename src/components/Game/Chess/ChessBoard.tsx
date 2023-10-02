import { Chess, Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import Engine from '../../../../public/engine'
import { ChessMove } from '../../../utils/interface'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { CustomSquareProps } from 'react-chessboard/dist/chessboard/types'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/shadcn_components/ui/avatar'

const ChessBoard = () => {
    const engine = useMemo(() => new Engine(), [])
    const game = useMemo(() => new Chess(), [])
    game.header('White', 'Dat')
    game.header('Black', 'Hieu')
    const [gamePosition, setGamePosition] = useState(game.fen())
    const [stockfishLevel, setStockfishLevel] = useState(2)
    const [playerTurn, setPlayerTurn] = useState<any>('white')
    const [customSquareRendererData, setCustomSquareRendererData] = useState<
        string[]
    >([])
    const CustomSquareRenderer = forwardRef<HTMLDivElement, CustomSquareProps>(
        (props, ref) => {
            const { children, square, squareColor, style } = props

            if (customSquareRendererData.includes(square)) {
                return (
                    <div
                        ref={ref}
                        style={{
                            ...style,
                            position: 'relative',
                            backgroundColor: 'rgb(11 223 9 / 37%)',
                        }}
                    >
                        {children}
                    </div>
                )
            } else {
                return (
                    <div
                        ref={ref}
                        style={{
                            ...style,
                            position: 'relative',
                        }}
                    >
                        {children}
                    </div>
                )
            }
        },
    )

    const findBestMove = () => {
        engine.evaluatePosition(game.fen(), stockfishLevel)

        engine.onMessage((bestMove) => {
            if (bestMove) {
                game.move({
                    from: bestMove.substring(0, 2),
                    to: bestMove.substring(2, 4),
                    promotion: bestMove.substring(4, 5),
                })

                setGamePosition(game.fen())
            }
        })
    }

    const onDrop = (sourceSquare: any, targetSquare: any, piece: any) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
        })

        if (move !== null) {
            // Kiểm tra xem có người thắng cuộc hay không
            if (game.isCheckmate()) {
                // Trò chơi kết thúc bằng chiếu mắt
                alert(
                    'Checkmate! Người thắng cuộc là: ' +
                        (game.turn() === 'w' ? 'Đen' : 'Trắng'),
                )
            } else if (game.isDraw()) {
                // Trò chơi kết thúc với kết quả hòa
                alert('Hòa!')
            } else {
                game.turn() == 'w'
                    ? setPlayerTurn('white')
                    : setPlayerTurn('black')
                setGamePosition(game.fen())
            }
        }
        findBestMove()

        return true
    }
    const chessMoveShowOnClick = (square: Square) => {
        const move: ChessMove[] = game.moves({ square: square, verbose: true })

        const validMove = move.map((move) => {
            return move.to
        })
        console.log(validMove)
        setCustomSquareRendererData(validMove)
    }

    return (
        <div className='flex justify-center bg-[url("/assets/chess_background.jpg")] h-screen '>
            <div
                style={{
                    width: 'calc((100vw - 820px)/2)',
                }}
                className='flex flex-col justify-between items-center py-[50px]'
            >
                <div className='flex flex-col items-center justify-center space-y-2 '>
                    <Avatar className='w-[100px] h-[100px]'>
                        <AvatarImage
                            src='https://github.com/shadcn.png'
                            alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-2xl text-[#fff]'>Eck</span>
                </div>
                <img
                    src='/assets/vs.png'
                    alt='vs'
                    className='w-[200px] h-[200px] object-fill'
                />
                <div className='flex flex-col items-center justify-center space-y-2 '>
                    <Avatar className='w-[100px] h-[100px]'>
                        <AvatarImage
                            src='https://github.com/shadcn.png'
                            alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-2xl text-[#fff]'>Eck</span>
                </div>
            </div>
            <div>
                <Chessboard
                    boardWidth={820}
                    position={gamePosition}
                    onPieceDrop={onDrop}
                    customSquare={CustomSquareRenderer}
                    onSquareClick={(square) => {
                        chessMoveShowOnClick(square)
                    }}
                />
            </div>
            <div
                style={{
                    width: 'calc((100vw - 820px)/2)',
                }}
            ></div>
        </div>
    )
}

export default ChessBoard
