import React from 'react'
import useSWR from 'swr'

import { useAddBanks, useBank } from '@/hooks/useBank'
import { useFavorite, useToggleFavorite } from '@/hooks/useFavorite'
import { Bank } from '@/types/bank'
import { setLocalItem } from '@/helpers/setLocalItem'
import { getLocalItem } from '@/helpers/getLocalItem'
import Hyperlink from '@/components/Hyperlink'
import Dashboard from '@/components/Dashboard'

const AllBanks = () => {
    const banks = useBank()
    const favorites = useFavorite()

    const addBanks = useAddBanks()
    const toggleFavorite = useToggleFavorite()

    const { data, error } = useSWR('api', fetcher)

    async function fetcher() {
        try {
            const response = await fetch(
                'https://vast-shore-74260.herokuapp.com/banks?city=BANGLORE'
            )
            const data: Omit<Bank, 'favorite'>[] = await response.json()

            return data
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    // function addData() {
    //     if (error === undefined && data !== undefined) {
    //         let finalData = data.map((item) => ({ ...item, favorite: false }))

    //         addBanks('banglore', finalData)
    //     }
    // }

    // function addFavorite(ifsc: string) {
    //     toggleFavorite('banglore', ifsc)
    // }

    return <Dashboard />
}

export default AllBanks
