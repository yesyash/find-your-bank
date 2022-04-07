import React from 'react'
import Link from 'next/link'

interface Props {
    children: React.ReactNode
    href: string
    className?: string
}

/*
    This components is a shorthand for the next/link component
*/
const Hyperlink: React.FC<Props> = ({ children, href, className }) => {
    return (
        <Link href={href}>
            <a className={className}>{children}</a>
        </Link>
    )
}

export default Hyperlink
