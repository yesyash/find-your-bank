import React from 'react'

interface BtnProps {
    children: React.ReactNode
    onClick: () => void
    disabled: boolean
}
export const PaginateButton: React.FC<BtnProps> = ({
    children,
    onClick,
    disabled,
}) => {
    return (
        <button
            className="mx-2 disabled:text-neutral-400"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
