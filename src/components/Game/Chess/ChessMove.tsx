import { twJoin } from 'tailwind-merge'
import ChessLocation from './ChessLocation'
import { ChessMoveProps } from '@/utils/interface'
import { FaLongArrowAltUp, FaLongArrowAltRight } from 'react-icons/fa'

const ChessMove = ({ turn }: ChessMoveProps) => {
    const {
        before,
        after,
        color,
        piece,
        from,
        to,
        san,
        lan,
        flags,
        captured,
        promotion,
    } = turn
    if (san == 'O-O' || san == 'O-O-O' || san == 'O-O+' || san == 'O-O-O+') {
        return (
            <div
                key={after + before + color}
                className={twJoin(
                    'text-[18px] flex items-center space-x-2 p-[8px]',
                    color == 'w'
                        ? 'bg-[#fff] text-[#000]'
                        : 'bg-[#000] text-[#fff]',
                )}
            >
                {san}
            </div>
        )
    }
    if (san.includes('x')) {
        if (san.includes('=')) {
            return (
                <div
                    key={after + before + color}
                    className={twJoin(
                        'text-[18px] flex items-center space-x-2 p-[8px]',
                        color == 'w'
                            ? 'bg-[#fff] text-[#000]'
                            : 'bg-[#000] text-[#fff]',
                    )}
                >
                    <ChessLocation name={piece} square={from} />
                    <img
                        src='./assets/attack.png'
                        className='w-[25px] h-[25px] object-cover'
                    />
                    <ChessLocation name={captured} square={to} />
                    <FaLongArrowAltUp />
                    <ChessLocation name={promotion as string} square={to} />
                    {san.includes('+') ? '+' : ''}
                </div>
            )
        }
        return (
            <div
                key={after + before + color}
                className={twJoin(
                    'text-[18px] flex items-center space-x-2 p-[8px]',
                    color == 'w'
                        ? 'bg-[#fff] text-[#000]'
                        : 'bg-[#000] text-[#fff]',
                )}
            >
                <ChessLocation name={piece} square={from} />
                <img
                    src='./assets/attack.png'
                    className='w-[25px] h-[25px] object-cover'
                />
                <ChessLocation name={piece} square={to} />
                {san.includes('+') ? '+' : ''}
            </div>
        )
    }
    return (
        <div
            key={after + before + color}
            className={twJoin(
                'text-[18px] flex items-center space-x-2 p-[8px]',
                color == 'w'
                    ? 'bg-[#fff] text-[#000]'
                    : 'bg-[#000] text-[#fff]',
            )}
        >
            <ChessLocation name={piece} square={from} />
            <FaLongArrowAltRight />
            <ChessLocation name={piece} square={to} />
            {san.includes('+') ? '+' : ''}
        </div>
    )
}

export default ChessMove
