import { twMerge } from 'tailwind-merge'
import { CapturedPieceData, CapturedPiecesProps } from '@/utils/interface'
import {
    FaChessRook,
    FaChessKnight,
    FaChessBishop,
    FaChessQueen,
    FaChessKing,
    FaChessPawn,
} from 'react-icons/fa'

const CapturedPieces = ({
    capturedPieceData,
    className,
}: CapturedPiecesProps) => {
    return (
        <div className='flex flex-wrap items-center space-x-2'>
            {capturedPieceData.length > 0
                ? capturedPieceData.map((capturedPiece: CapturedPieceData) => {
                      if (capturedPiece.piece == 'r') {
                          return (
                              <div
                                  key={capturedPiece.piece}
                                  className={twMerge(
                                      'flex items-center space-x-1',
                                      className,
                                  )}
                              >
                                  <FaChessRook />
                                  {capturedPiece.quantity > 0
                                      ? `x ${capturedPiece.quantity}`
                                      : null}
                              </div>
                          )
                      }
                      if (capturedPiece.piece == 'n') {
                          return (
                              <div
                                  key={capturedPiece.piece}
                                  className={twMerge(
                                      'flex items-center space-x-1',
                                      className,
                                  )}
                              >
                                  <FaChessKnight />
                                  {capturedPiece.quantity > 0
                                      ? `x ${capturedPiece.quantity}`
                                      : null}
                              </div>
                          )
                      }
                      if (capturedPiece.piece == 'b') {
                          return (
                              <div
                                  key={capturedPiece.piece}
                                  className={twMerge(
                                      'flex items-center space-x-1',
                                      className,
                                  )}
                              >
                                  <FaChessBishop />
                                  {capturedPiece.quantity > 0
                                      ? `x ${capturedPiece.quantity}`
                                      : null}
                              </div>
                          )
                      }
                      if (capturedPiece.piece == 'q') {
                          return (
                              <div
                                  key={capturedPiece.piece}
                                  className={twMerge(
                                      'flex items-center space-x-1',
                                      className,
                                  )}
                              >
                                  <FaChessQueen />
                                  {capturedPiece.quantity > 0
                                      ? `x ${capturedPiece.quantity}`
                                      : null}
                              </div>
                          )
                      }
                      if (capturedPiece.piece == 'k') {
                          return (
                              <div
                                  key={capturedPiece.piece}
                                  className={twMerge(
                                      'flex items-center space-x-1',
                                      className,
                                  )}
                              >
                                  <FaChessKing />
                                  {capturedPiece.quantity > 0
                                      ? `x ${capturedPiece.quantity}`
                                      : null}
                              </div>
                          )
                      }
                      if (capturedPiece.piece == 'p') {
                          return (
                              <div
                                  key={capturedPiece.piece}
                                  className={twMerge(
                                      'flex items-center space-x-1',
                                      className,
                                  )}
                              >
                                  <FaChessPawn />
                                  {capturedPiece.quantity > 0
                                      ? `x ${capturedPiece.quantity}`
                                      : null}
                              </div>
                          )
                      }
                  })
                : null}
        </div>
    )
}

export default CapturedPieces
