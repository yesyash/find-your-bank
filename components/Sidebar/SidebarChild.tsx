/*
    Contains all sub-components used exclusively by
    Sidebar.tsx (or other components in
    this directory).
  */

import { cn } from '@/helpers/classname'

import Hyperlink from '@/components/Hyperlink'

interface SidebarLinkProps {
    currentPath: string
    href: string
    children: React.ReactNode
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
    currentPath,
    href,
    children,
}) => {
    return (
        <li
            className={cn(
                'mb-3 transition duration-200 rounded-lg',
                currentPath === href ? 'bg-blue-100' : 'hover:bg-neutral-200'
            )}
        >
            <Hyperlink
                href={href}
                className={cn(
                    'flex items-center justify-start px-4 py-2 transition duration-200',
                    currentPath === href
                        ? 'text-blue-700 font-medium'
                        : 'text-neutral-600 hover:text-neutral-800'
                )}
            >
                {children}
            </Hyperlink>
        </li>
    )
}
