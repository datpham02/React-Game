import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '@/shadcn_components/ui/navigation_menu'
import { HeaderProps } from '@/utils/interface'
import { twMerge } from 'tailwind-merge'

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header
            className={twMerge(
                'flex items-center h-[80px] bg-[red]',
                className,
            )}
        >
            {/* <div>
                <span>ReactGame</span>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu> */}
        </header>
    )
}

export default Header
