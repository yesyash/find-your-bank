import { useEffect, useState } from 'react'
import { NextPage } from 'next'

// constants
import { cities } from '@/constants'

// helper functions
import { loadBankList } from './Home.helpers'

// hooks
import { useAddBank, useBank } from '@/hooks/useBank'

import DashboardLayout from '@/components/DashboardLayout'

const Home: NextPage = () => {
    const allBanksList = useBank()
    const addBanks = useAddBank()

    // table usestates
    const [loading, setLoading] = useState(false)

    // dropdown usestates
    const [city, setCity] = useState(cities[0])

    useEffect(() => {
        loadBankList(city.value, setLoading, addBanks)
    }, [city, addBanks])

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

export default Home
