import { useState } from 'react'
import { NextPage } from 'next'

// constants
import { cities } from '@/constants'

// hooks
import { useBank } from '@/hooks/useBank'

import DashboardLayout from '@/components/DashboardLayout'

const Favorites: NextPage = () => {
    const allBanksList = useBank().filter((bank) => bank.favorite === true)

    // table usestates
    const [loading, setLoading] = useState(false)

    // dropdown usestates
    const [city, setCity] = useState(cities[0])

    return (
        <>
            <DashboardLayout
                allBanksList={allBanksList}
                city={city}
                loading={loading}
                pageName="All Banks"
                setCity={setCity}
            />
        </>
    )
}

export default Favorites
