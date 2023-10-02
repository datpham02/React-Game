import { FooterProps } from '@/utils/interface'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Footer: React.FC<FooterProps> = ({ className }) => {
    return <div className={twMerge('h-[200px] bg-[red]', className)}></div>
}

export default Footer
