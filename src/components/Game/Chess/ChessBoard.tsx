import { Chess, Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import Engine from '../../../../public/engine'
import { ChessMove } from '../../../utils/interface'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { CustomSquareProps } from 'react-chessboard/dist/chessboard/types'
import { ScrollArea } from '@/shadcn_components/ui/scroll_area'

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
        <div className='flex justify-center items-center bg-[#302E2B] h-screen space-x-10 '>
            <div>
                <div className='flex items-start justify-start space-x-2  '>
                    <img
                        className='w-[50px] h-[50px]'
                        src='https://github.com/shadcn.png'
                    />
                    <span className='text-lg text-[#fff]'>Eck</span>
                </div>
                <Chessboard
                    boardWidth={710}
                    position={gamePosition}
                    onPieceDrop={onDrop}
                    customSquare={CustomSquareRenderer}
                    onSquareClick={(square) => {
                        chessMoveShowOnClick(square)
                    }}
                />
                <div className='flex items-start justify-start space-x-2  '>
                    <img
                        className='w-[50px] h-[50px]'
                        src='https://github.com/shadcn.png'
                    />
                    <span className='text-lg text-[#fff]'>Eck</span>
                </div>
            </div>
            <div
                style={{
                    width: 'calc((100vw - 820px)/2)',
                }}
                className='h-full py-[55px]'
            >
                <div className='bg-[#21201D] h-full flex flex-col justify-between'>
                    <div className='h-[70%] py-[10px] flex flex-col'>
                        <span className='text-[#fff] font-bold px-[10px]'>
                            History
                        </span>
                        <div className='bg-[#93928A] w-full h-[1px] my-[10px]'></div>
                        <div className='flex flex-col justify-between h-full'>
                            <ScrollArea>
                                <div className='flex flex-col '>
                                    <div className='flex flex-col py-[4px] px-[10px]'>
                                        <div className='flex items-center text-[#fff]'>
                                            <span className='text-[#93928A] font-medium w-[10%]'>
                                                1.
                                            </span>
                                            <div className='flex items-center space-x-20 font-semibold'>
                                                <span>d4</span>
                                                <span>d6</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col py-[4px] px-[10px] bg-[#2A2926]'>
                                        <div className='flex items-center text-[#fff]'>
                                            <span className='text-[#93928A] font-medium w-[10%]'>
                                                2.
                                            </span>
                                            <div className='flex items-center space-x-20 font-semibold'>
                                                <span>d4</span>
                                                <span>d6</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                            <div className='flex items-center justify-center space-x-6'>
                                <BiArrowToLeft className='text-[#90908E] w-[35px] h-[35px] cursor-pointer' />
                                <IoIosArrowBack className='text-[#90908E] w-[30px] h-[30px] cursor-pointer' />
                                <IoIosArrowForward className='text-[#90908E] w-[30px] h-[30px] cursor-pointer' />
                                <BiArrowToRight className='text-[#90908E] w-[35px] h-[35px] cursor-pointer' />
                            </div>
                        </div>
                    </div>
                    <div className='h-[30%] flex flex-col'>
                        <div className='bg-[#262522] flex-1'></div>
                        <input
                            placeholder='Trò chuyện'
                            className='w-full bg-transparent py-[10px] outline-none text-[#fff] pl-[8px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChessBoard
