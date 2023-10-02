import HoverCard from '../Card/HoverCard'
import { Button } from '@/shadcn_components/ui/button'

const BoxItem = () => {
    return (
        <HoverCard
            data={
                <div className='flex flex-col rounded-lg overflow-hidden border-[1px]'>
                    <img
                        className='w-full h-full object-cover'
                        src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.2081-6/277356472_1124731698312948_771859553962933608_n.jpg?stp=c0.0.193.193a_dst-jpg_p192x192&_nc_cat=1&ccb=1-7&_nc_sid=b29aad&_nc_ohc=Exn4ntUzDOMAX8dBX_z&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfB-MYQ09-4AFepwe9LjQp-9J_f6ROWjKCkoD2_-Mf94Uw&oe=651D4C97'
                    />
                    <div className='py-[15px] px-[10px]'>
                        <span className='text-xl font-semibold'>Cờ vua</span>
                    </div>
                </div>
            }
            dataShowOnHover={
                <div className='flex flex-col rounded-lg overflow-hidden border-[1px] bg-[#fff] w-[500px] h-[400px]'>
                    <img
                        className='w-full h-[65%] object-fill '
                        src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.2081-6/277356472_1124731698312948_771859553962933608_n.jpg?stp=c0.0.193.193a_dst-jpg_p192x192&_nc_cat=1&ccb=1-7&_nc_sid=b29aad&_nc_ohc=Exn4ntUzDOMAX8dBX_z&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfB-MYQ09-4AFepwe9LjQp-9J_f6ROWjKCkoD2_-Mf94Uw&oe=651D4C97'
                    />
                    <div className='py-[20px] px-[10px] h-[35%] flex flex-col space-y-2'>
                        <span className='text-xl font-semibold'>Cờ vua</span>
                        <p>A game for training your brain</p>
                        <Button>Chơi ngay</Button>
                    </div>
                </div>
            }
        />
    )
}

export default BoxItem
