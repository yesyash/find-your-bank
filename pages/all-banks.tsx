import { NextPage } from 'next'

import { useBank } from '@/hooks/useBank'
import Dashboard from '@/components/Dashboard'

const AllBanks: NextPage = () => {
    const banks = useBank()

    return <Dashboard banks={banks} pageName={'All Banks'} showFilter />
}

export default AllBanks
