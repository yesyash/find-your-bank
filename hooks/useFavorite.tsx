import { useContext } from 'react'

import { GlobalContext, UseGlobalManagerResult } from '@/context/global.context'

import { Bank } from '@/types/bank'

export const useFavorite = (): Bank[] => {
    const { state } = useContext(GlobalContext)

    return state.favorites
}

export const useToggleFavorite =
    (): UseGlobalManagerResult['toggleFavorite'] => {
        const { toggleFavorite } = useContext(GlobalContext)
        return toggleFavorite
    }
