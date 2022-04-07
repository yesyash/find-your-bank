import React from 'react'
import { useRouter } from 'next/router'
import { Home, Heart } from 'react-feather'

import { SidebarRoutes, SvgStyles } from './Sidebar.constants'
import { SidebarLink } from './SidebarChild'

const Sidebar: React.FC = () => {
    const { pathname } = useRouter()

    return (
        <aside className="fixed top-0 left-0 w-56 h-screen bg-neutral-50">
            <ul className="w-full h-full px-4 py-8 border-r border-slate-200">
                <li>
                    <h1 className="px-4 pb-4 mb-6 text-xl font-semibold">
                        Find Your Bank
                    </h1>
                </li>

                {SidebarRoutes.map((route) => (
                    <SidebarLink
                        key={route.name}
                        href={route.path}
                        currentPath={pathname}
                    >
                        {route.path === '/' ? (
                            <Home {...SvgStyles} />
                        ) : (
                            <Heart {...SvgStyles} />
                        )}
                        <span className="block ml-4">{route.name}</span>
                    </SidebarLink>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar
