import {
    FaChessBishop,
    FaChessKing,
    FaChessKnight,
    FaChessPawn,
    FaChessQueen,
    FaChessRook,
} from 'react-icons/fa'
import { BsFillSquareFill } from 'react-icons/bs'
import { ChessManProps } from '@/utils/interface'
import { twMerge } from 'tailwind-merge'

const ChessLocation = ({ name, square, className }: ChessManProps) => {
    if (name == 'r') {
        return (
            <div className={twMerge('flex items-center space-x-1', className)}>
                <FaChessRook />
                <span>{square}</span>
            </div>
        )
    }
    if (name == 'n') {
        return (
            <div className={twMerge('flex items-center space-x-1', className)}>
                <FaChessKnight />
                <span>{square}</span>
            </div>
        )
    }
    if (name == 'b') {
        return (
            <div className={twMerge('flex items-center space-x-1', className)}>
                <FaChessBishop />
                <span>{square}</span>
            </div>
        )
    }
    if (name == 'q') {
        return (
            <div className={twMerge('flex items-center space-x-1', className)}>
                <FaChessQueen />
                <span>{square}</span>
            </div>
        )
    }
    if (name == 'k') {
        return (
            <div className={twMerge('flex items-center space-x-1', className)}>
                <FaChessKing />
                <span>{square}</span>
            </div>
        )
    }
    if (name == 'p') {
        return (
            <div className={twMerge('flex items-center space-x-1', className)}>
                <FaChessPawn />
                <span>{square}</span>
            </div>
        )
    }
    return (
        <div className={twMerge('flex items-center space-x-1', className)}>
            <BsFillSquareFill />
            <span>{square}</span>
        </div>
    )
}

export default ChessLocation
