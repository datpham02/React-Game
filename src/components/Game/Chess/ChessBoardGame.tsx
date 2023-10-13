import { useEffect, useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import Engine from '../../../../public/engine'
import PromotionDialog from './PromotionDialog'
import { Piece, Square } from 'react-chessboard/dist/chessboard/types'
import { ChessBoardGameProps } from '@/utils/interface'
const ChessBoardGame = ({ historyDataOnchange }: ChessBoardGameProps) => {
    const engine = useMemo(() => new Engine(), [])
    const [game, setGame] = useState(new Chess())
    const [stockfishLevel, setStockfishLevel] = useState(2)
    const [moveFrom, setMoveFrom] = useState<Square | null>(null)
    const [moveTo, setMoveTo] = useState<Square | null>(null)
    const [showPromotionDialog, setShowPromotionDialog] = useState(false)
    const [optionSquares, setOptionSquares] = useState({})
    const [historyMove, setHistoryMove] = useState({})
    const [turn, setTurn] = useState<string>('w')
    const getMoveOptions = (square: Square) => {
        const moves = game.moves({
            square,
            verbose: true,
        })
        if (moves.length === 0) {
            setOptionSquares({})
            return false
        }

        const newSquares: any = {}
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                    game.get(move.to).color !== game.get(square).color
                        ? 'radial-gradient(circle, rgb(0 0 0 / 38%) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgb(0 0 0 / 38%) 25%, transparent 25%)',
                borderRadius: '50%',
            }
            return move
        })

        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)',
        }
        setOptionSquares(newSquares)
        return true
    }
    const computerMove = () => {
        engine.evaluatePosition(game.fen(), stockfishLevel)

        engine.onMessage((bestMove) => {
            if (bestMove) {
                const gameCopy = new Chess(game.fen())
                const from = bestMove.substring(0, 2)
                const to = bestMove.substring(2, 4)
                const promomtion = bestMove.substring(4, 5)
                const move = gameCopy.move({
                    from: from,
                    to: to,
                    promotion: promomtion ?? 'q',
                })
                if (move == null) {
                    computerMove()
                } else {
                    const historyMoveData = {
                        [from]: {
                            background: 'rgb(186 220 88 / 42%)',
                        },
                        [to]: {
                            background: 'rgb(186 220 88 / 42%)',
                        },
                    }
                    setHistoryMove(historyMoveData)
                    setTurn(gameCopy.turn())
                    setGame(gameCopy)
                }
            }
        })
    }

    const onSquareClick = (square: Square) => {
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square)
            if (hasMoveOptions) setMoveFrom(square)
            return
        }
        if (square == moveFrom) return
        if (!moveTo) {
            const moves = game.moves({
                square: moveFrom,
                verbose: true,
            })
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square,
            )

            if (!foundMove) {
                const hasMoveOptions = getMoveOptions(square)

                if (hasMoveOptions) {
                    setMoveFrom(square)
                } else setMoveFrom(null)
                return
            }

            setMoveTo(square)

            if (
                (foundMove.color === 'w' &&
                    foundMove.piece === 'p' &&
                    square[1] === '8') ||
                (foundMove.color === 'b' &&
                    foundMove.piece === 'p' &&
                    square[1] === '1')
            ) {
                setShowPromotionDialog(true)
                return
            }
            const gameCopy = new Chess(game.fen())

            const move = gameCopy.move({
                from: moveFrom,
                to: square,
            })

            if (move === null) {
                return
            }
            const historyMoveData = {
                [moveFrom]: {
                    background: 'rgb(186 220 88 / 42%)',
                },
                [square]: {
                    background: 'rgb(186 220 88 / 42%)',
                },
            }
            setHistoryMove(historyMoveData)
            setTurn(gameCopy.turn())
            setGame(gameCopy)
            setMoveFrom(null)
            setMoveTo(null)
            setOptionSquares({})

            return
        }
    }
    // const onPieceDragBegin = (piece: Piece, sourceSquare: Square) => {
    //     if (!moveFrom) {
    //         const hasMoveOptions = getMoveOptions(sourceSquare)
    //         if (hasMoveOptions) setMoveFrom(sourceSquare)
    //         return
    //     }
    // }
    // const onPieceDragEnd = (piece: Piece, sourceSquare: Square) => {
    //     setMoveFrom(null)
    //     setOptionSquares({})
    // }
    // const onPieceDrop = (
    //     sourceSquare: Square,
    //     targetSquare: Square,
    //     piece: Piece,
    // ) => {
    //     const moves = game.moves({
    //         square: moveFrom as Square,
    //         verbose: true,
    //     })
    //     const foundMove = moves.find(
    //         (m) => m.from === moveFrom && m.to === targetSquare,
    //     )

    //     if (!foundMove) {
    //         return false
    //     }

    //     if (
    //         (foundMove.color === 'w' &&
    //             foundMove.piece === 'p' &&
    //             targetSquare[1] === '8') ||
    //         (foundMove.color === 'b' &&
    //             foundMove.piece === 'p' &&
    //             targetSquare[1] === '1')
    //     ) {
    //         setMoveFrom(sourceSquare)
    //         setMoveTo(targetSquare)
    //         setShowPromotionDialog(true)
    //         return false
    //     }
    //     const gameCopy = new Chess(game.fen())

    //     const move = gameCopy.move({
    //         from: moveFrom as Square,
    //         to: targetSquare,
    //     })

    //     if (move === null) {
    //         return false
    //     }
    //     const historyMoveData = {
    //         [moveFrom as string]: {
    //             background: 'rgb(186 220 88 / 42%)',
    //         },
    //         [targetSquare]: {
    //             background: 'rgb(186 220 88 / 42%)',
    //         },
    //     }
    //     setHistoryMove(historyMoveData)
    //     setTurn(gameCopy.turn())
    //     setGame(gameCopy)
    //     setMoveFrom(null)
    //     setMoveTo(null)
    //     setOptionSquares({})
    //     return true
    // }
    const onPromotionPieceSelect = (promotion: string) => {
        if (moveFrom && moveTo) {
            if (promotion) {
                const gameCopy = new Chess(game.fen())
                gameCopy.move({
                    from: moveFrom,
                    to: moveTo,
                    promotion: promotion ?? 'q',
                })
                setGame(gameCopy)
            }
            const historyMoveData = {
                [moveFrom]: {
                    background: 'rgb(186 220 88 / 42%)',
                },
                [moveTo]: {
                    background: 'rgb(186 220 88 / 42%)',
                },
            }
            setHistoryMove(historyMoveData)
            setMoveFrom(null)
            setMoveTo(null)
            setShowPromotionDialog(false)
            setOptionSquares({})
        }
    }

    // const isDraggable = (arg: { piece: Piece; sourceSquare: Square }) => {
    //     if (turn == game.turn()) {
    //         if (arg.piece[0] == turn) {
    //             return true
    //         } else return false
    //     }
    //     return false
    // }

    useEffect(() => {
        if (turn == 'b') {
            computerMove()
        }
    }, [game.turn()])

    return (
        <div className='relative flex items-center'>
            <Chessboard
                animationDuration={300}
                arePiecesDraggable={false}
                position={game.fen()}
                onSquareClick={onSquareClick}
                // onPieceDragBegin={onPieceDragBegin}
                // onPieceDragEnd={onPieceDragEnd}
                // onPieceDrop={onPieceDrop}
                customSquareStyles={{
                    ...optionSquares,
                    ...historyMove,
                }}
                showPromotionDialog={false}
                boardWidth={700}
            />
            {showPromotionDialog ? (
                <PromotionDialog
                    color={turn}
                    onPromotionPieceSelect={onPromotionPieceSelect}
                />
            ) : null}
        </div>
    )
}

export default ChessBoardGame
