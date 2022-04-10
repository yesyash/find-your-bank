import { NextPage } from 'next'

import Dashboard from '@/components/Dashboard'
import { useFavorite } from '@/hooks/useFavorite'

const Favorites: NextPage = () => {
    const favorites = useFavorite()

    return (
        <>
            <Dashboard banks={favorites} pageName="Favorites" />
        </>
    )
}

export default Favorites
