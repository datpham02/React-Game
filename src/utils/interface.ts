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
export interface ChessManProps {
    name?: string
    square: string
    className?: string
}
export interface TurnData {
    before: string
    after: string
    color: string
    piece: string
    from: string
    to: string
    san: string
    lan: string
    flags: string
    captured?: string
    promotion?: string
}
export interface HistoryProps {
    historyData: {
        w: TurnData
        b: TurnData
    }[]
}
export interface CapturedPieceData {
    piece: string
    quantity: number
}
export interface CapturedPiecesProps {
    capturedPieceData: CapturedPieceData[]
    className?: string
}
export interface ChessMoveProps {
    turn: TurnData
}
export interface PlayerInfoProps {
    avatar: string
    name: string
    capturedPieces: CapturedPieceData[]
    pieceColor: string
}
export interface Player {
    id: string
    name: string
    avatar: string
}
export interface ChessBoardGameProps {
    playerWhite: Player
    playerBlack: Player
}
