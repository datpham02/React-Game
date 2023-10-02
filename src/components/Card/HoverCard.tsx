import React from 'react'
import Tippy from '@tippyjs/react/headless'
import { HoverCardProps } from '@/utils/interface'

const HoverCard: React.FC<HoverCardProps> = ({ data, dataShowOnHover }) => {
    return (
        <Tippy
            interactive
            placement='right-start'
            render={(attrs) => <div {...attrs}>{dataShowOnHover}</div>}
        >
            {data}
        </Tippy>
    )
}

export default HoverCard
