import { useContext } from 'react'

import { GlobalContext, UseGlobalManagerResult } from '@/context/global.context'

import { Bank } from '@/types/bank'

export const useFavorite = (): Bank[] => {
    const {
        state: { banks },
    } = useContext(GlobalContext)
    let favorites = banks.filter((bank) => bank.favorite === true)

    return favorites
}

export const useToggleFavorite =
    (): UseGlobalManagerResult['toggleFavorite'] => {
        const { toggleFavorite } = useContext(GlobalContext)
        return toggleFavorite
    }
