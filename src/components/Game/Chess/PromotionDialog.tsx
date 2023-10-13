import { PromotionDialogProps } from '@/utils/interface'
import {
    BBishop,
    BKnight,
    BQueen,
    BRook,
    WBishop,
    WKnight,
    WQueen,
    WRook,
} from './Pieces'
import { twMerge } from 'tailwind-merge'

const PromotionDialog = ({
    color,
    className,

    onPromotionPieceSelect,
}: PromotionDialogProps) => {
    return (
        <div
            className={twMerge(
                'absolute w-[700px] flex items-center justify-evenly bg-[#ffffffa1]',
                className,
            )}
        >
            <div
                onClick={() => {
                    onPromotionPieceSelect('q')
                }}
                className='w-[150px] h-[150px] hover:rounded-full hover:bg-[rgba(0,0,0,0.05)] cursor-pointer p-[15px] flex items-center justify-center'
            >
                {color == 'w' ? WQueen : BQueen}
            </div>
            <div
                onClick={() => {
                    onPromotionPieceSelect('r')
                }}
                className='w-[150px] h-[150px] hover:rounded-full hover:bg-[rgba(0,0,0,0.05)] cursor-pointer p-[15px] flex items-center justify-center'
            >
                {color == 'w' ? WRook : BRook}
            </div>
            <div
                onClick={() => {
                    onPromotionPieceSelect('b')
                }}
                className='w-[150px] h-[150px] hover:rounded-full hover:bg-[rgba(0,0,0,0.05)] cursor-pointer p-[15px] flex items-center justify-center'
            >
                {color == 'w' ? WBishop : BBishop}
            </div>
            <div
                onClick={() => {
                    onPromotionPieceSelect('k')
                }}
                className='w-[150px] h-[150px] hover:rounded-full hover:bg-[rgba(0,0,0,0.05)] cursor-pointer p-[15px] flex items-center justify-center'
            >
                {color == 'w' ? WKnight : BKnight}
            </div>
        </div>
    )
}

export default PromotionDialog
