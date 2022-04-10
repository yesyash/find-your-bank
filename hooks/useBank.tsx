import useSWR from 'swr'
import React from 'react'

import { Bank } from '@/types/bank'

import { GlobalContext, UseGlobalManagerResult } from '@/context/global.context'
import { fetcher } from '@/helpers/fetcher'

interface GetBanksRes {
    data: Omit<Bank[], 'favorite'>
    isLoading: boolean
    error: any
}

export const useBank = (): Bank[] => {
    const { state } = React.useContext(GlobalContext)

    return state.banks
}

export const useAddBanks = (): UseGlobalManagerResult['addBanks'] => {
    const { addBanks } = React.useContext(GlobalContext)
    return addBanks
}

// Get all banks data realted t oa city using SWR
export const useGetBanks = (city: string): GetBanksRes => {
    const { data, error } = useSWR(
        `https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase()}`,
        fetcher,
        {
            fallbackData: [],
            revalidateOnFocus: false,
        }
    )

    let res: GetBanksRes['data'] = data

    return {
        data: res,
        isLoading: res.length === 0 && !error,
        error: error,
    }
}
