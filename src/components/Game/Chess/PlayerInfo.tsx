import { PlayerInfoProps } from '@/utils/interface'
import CapturedPieces from './CapturedPieces'

const PlayerInfo = ({
    avatar,
    name,
    capturedPieces,
    pieceColor,
}: PlayerInfoProps) => {
    return (
        <div className='flex items-start justify-start space-x-2 h-full'>
            <img className='w-[60px] h-full object-cover' src={avatar} />
            <div className='h-full flex flex-col justify-between py-[5px] items-start'>
                <span className='text-lg text-[#fff]'>{name}</span>
                <CapturedPieces
                    capturedPieceData={capturedPieces}
                    className={`text-[${pieceColor}]`}
                />
            </div>
        </div>
    )
}

export default PlayerInfo
