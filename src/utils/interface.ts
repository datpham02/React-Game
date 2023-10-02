import React from 'react'

export interface ChessMove {
    color: string
    piece: string
    from: string
    to: string
    san: string
    flags: string
    lan: string
    before: string
    after: string
}

export interface HeaderProps {
    className?: string
}
export interface FooterProps {
    className?: string
}
export interface DefaultLayoutProps {
    className?: string
}
export interface BoxProps {
    title: string
    children: React.ReactNode
    className?: string
}
export interface CardProps {
    img: string
    title: string
    className?: string
}

export interface HoverCardProps {
    data: any
    dataShowOnHover: any
    className?: string
}
