import React from 'react'
import { Box, BoxItem, Footer, Header } from '@/components'
import { DefaultLayoutProps } from '@/utils/interface'
import { twMerge } from 'tailwind-merge'
import { ScrollArea } from '@/shadcn_components/ui/scroll_area'

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ className }) => {
    return (
        <div
            className={twMerge(
                'flex flex-col h-screen justify-between',
                className,
            )}
        >
            <Header className='items-start' />
            <ScrollArea className='flex-1 px-[100px]'>
                <Box title='Tất cả game'>
                    <BoxItem />
                    <BoxItem />
                    <BoxItem />
                    <BoxItem />
                    <BoxItem />
                    <BoxItem />
                </Box>
            </ScrollArea>
            {/* <Footer className='items-end' /> */}
        </div>
    )
}

export default DefaultLayout
