import { useEffect, useMemo, useState } from 'react'
import { Chess, Move } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import Engine from '../../../../public/engine'
import {
    Piece,
    PromotionPieceOption,
    Square,
} from 'react-chessboard/dist/chessboard/types'
const ChessBoardGame = () => {
    const engine = useMemo(() => new Engine(), [])
    const [game, setGame] = useState(new Chess())
    const [stockfishLevel, setStockfishLevel] = useState(2)
    const [moveFrom, setMoveFrom] = useState<Square | null>(null)
    const [moveTo, setMoveTo] = useState<Square | null>(null)
    const [showPromotionDialog, setShowPromotionDialog] = useState(false)
    const [optionSquares, setOptionSquares] = useState({})
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
                        ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
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
                console.log(bestMove)
                const gameCopy = new Chess(game.fen())
                const move = gameCopy.move({
                    from: bestMove.substring(0, 2),
                    to: bestMove.substring(2, 4),
                    promotion: bestMove.substring(4, 5),
                })
                if (move == null) {
                    computerMove()
                } else {
                    setTurn('w')
                    setGame(gameCopy)
                }
            }
        })
    }

    const onSquareClick = (square: Square) => {
        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square)
            if (hasMoveOptions) setMoveFrom(square)
            return
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({
                square: moveFrom,
                verbose: true,
            })
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square,
            )
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square)
                // if new piece, setMoveFrom, otherwise clear moveFrom
                if (hasMoveOptions) {
                    setMoveFrom(square)
                } else setMoveFrom(null)

                return
            }

            // valid move
            setMoveTo(square)

            // if promotion move
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

            // is normal move
            const gameCopy = new Chess(game.fen())

            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: 'q',
            })

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square)
                if (hasMoveOptions) setMoveFrom(square)
                return
            }
            setTurn(gameCopy.turn())
            setGame(gameCopy)
            setMoveFrom(null)
            setMoveTo(null)
            setOptionSquares({})
            return
        }
    }
    const onPieceDragBegin = (piece: Piece, sourceSquare: Square) => {
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(sourceSquare)
            if (hasMoveOptions) setMoveFrom(sourceSquare)
            return
        }
    }
    const onPieceDragEnd = (piece: Piece, sourceSquare: Square) => {
        setMoveFrom(null)
        setOptionSquares({})
    }
    const onPieceDrop = (
        sourceSquare: Square,
        targetSquare: Square,
        piece: Piece,
    ) => {
        const moves = game.moves({
            square: sourceSquare,
            verbose: true,
        })
        const foundMove = moves.find(
            (m) => m.from === sourceSquare && m.to === targetSquare,
        ) as Move

        if (
            (foundMove.color === 'w' &&
                foundMove.piece === 'p' &&
                sourceSquare[1] === '8') ||
            (foundMove.color === 'b' &&
                foundMove.piece === 'p' &&
                sourceSquare[1] === '1')
        ) {
            setShowPromotionDialog(true)
            return true
        }

        const gameCopy = new Chess(game.fen())

        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1].toLowerCase() ?? 'q',
        })

        if (move === null) {
            return false
        }
        setTurn(gameCopy.turn())
        setGame(gameCopy)
        setMoveFrom(null)
        setOptionSquares({})
        return true
    }

    const onPromotionPieceSelect = (piece: PromotionPieceOption) => {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece) {
            const gameCopy = { ...game } as Chess
            gameCopy.move({
                from: moveFrom as string,
                to: moveTo as string,
                promotion: piece[1]?.toLowerCase() ?? 'q',
            })
            setGame(gameCopy)
        }

        setMoveFrom(null)
        setMoveTo(null)
        setShowPromotionDialog(false)
        setOptionSquares({})
        return true
    }
    const isDraggable = (arg: { piece: Piece; sourceSquare: Square }) => {
        if (turn == game.turn()) {
            if (arg.piece[0] == turn) {
                return true
            } else return false
        }
        return false
    }
    // useEffect(() => {
    //     if (turn == 'b') {
    //         computerMove()
    //     }
    // }, [game.turn()])
    return (
        <div>
            <Chessboard
                id='ClickToMove'
                animationDuration={300}
                isDraggablePiece={isDraggable}
                position={game.fen()}
                onSquareClick={onSquareClick}
                onPieceDragBegin={onPieceDragBegin}
                onPieceDragEnd={onPieceDragEnd}
                onPieceDrop={onPieceDrop}
                onPromotionPieceSelect={onPromotionPieceSelect as any}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
                customSquareStyles={{
                    ...optionSquares,
                }}
                promotionToSquare={moveTo}
                showPromotionDialog={showPromotionDialog}
                boardWidth={700}
            />
            {/* <button
                style={buttonStyle}
                onClick={() => {
                    safeGameMutate((game) => {
                        game.reset()
                    })
                    setMoveSquares({})
                    setOptionSquares({})
                    setRightClickedSquares({})
                }}
            >
                reset
            </button>
            <button
                style={buttonStyle}
                onClick={() => {
                    safeGameMutate((game) => {
                        game.undo()
                    })
                    setMoveSquares({})
                    setOptionSquares({})
                    setRightClickedSquares({})
                }}
            >
                undo
            </button> */}
        </div>
    )
}

export default ChessBoardGame
