import React from 'react'
import { BoxProps } from '@/utils/interface'
import { twMerge } from 'tailwind-merge'

const Box: React.FC<BoxProps> = ({ title, children, className }) => {
    return (
        <div
            className={twMerge('flex flex-col space-y-2 px-[10px]', className)}
        >
            <span className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                {title}
            </span>
            <div className='grid 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2'>
                {children}
            </div>
        </div>
    )
}

export default Box
