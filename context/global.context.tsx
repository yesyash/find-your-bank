import React, { createContext, useCallback, useReducer } from 'react'

import { Bank } from '@/types/bank'

interface State {
    banks: Bank[]
    favorites: Bank[]
}

type Action =
    | { type: 'AddBanks'; banks: Bank[] }
    | { type: 'ToggleFavorite'; bank: Bank }

export type UseGlobalManagerResult = ReturnType<typeof useGlobalManager>

export const GlobalContext = createContext<UseGlobalManagerResult>({
    state: { banks: [], favorites: [] },
    addBanks: () => {},
    toggleFavorite: () => {},
})

function globalReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'AddBanks':
            let newBanks = action.banks

            for (const favBank of state.favorites) {
                for (const newBank of newBanks) {
                    if (favBank.ifsc === newBank.ifsc) {
                        newBank.favorite = true
                    }
                }
            }

            return {
                ...state,
                banks: newBanks,
            }

        case 'ToggleFavorite':
            let newFavorites = [...state.favorites, action.bank].filter(
                (bank) => bank.favorite === true
            )

            let index = newFavorites.findIndex(
                (bank) => bank.ifsc === action.bank.ifsc
            )

            if (index >= 0 && action.bank.favorite === false) {
                newFavorites.splice(index, 1)
            }

            return {
                ...state,
                banks: state.banks.map((bank) =>
                    bank.ifsc === action.bank.ifsc
                        ? { ...bank, favorite: !bank.favorite }
                        : bank
                ),
                favorites: newFavorites,
            }
        default:
            throw new Error()
    }
}

function useGlobalManager(initialState: State): {
    state: State
    addBanks: (banks: Bank[]) => void
    toggleFavorite: (bank: Bank) => void
} {
    const [state, dispatch] = useReducer(globalReducer, initialState)

    const addBanks = useCallback((banks: Bank[]) => {
        dispatch({ type: 'AddBanks', banks })
    }, [])

    const toggleFavorite = useCallback((bank: Bank) => {
        dispatch({ type: 'ToggleFavorite', bank })
    }, [])

    return { state, addBanks, toggleFavorite }
}

export const GlobalProvider: React.FC<{
    initialProps: State
    children: React.ReactNode
}> = ({ initialProps, children }) => {
    return (
        <GlobalContext.Provider value={useGlobalManager(initialProps)}>
            {children}
        </GlobalContext.Provider>
    )
}
