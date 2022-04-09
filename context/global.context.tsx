import React, { createContext, useCallback, useReducer } from 'react'

import { Bank } from '@/types/bank'

interface State {
    banks: Bank[]
}

type Action =
    | { type: 'AddBanks'; banks: Bank[] }
    | { type: 'ToggleFavorite'; ifsc: string }

export type UseGlobalManagerResult = ReturnType<typeof useGlobalManager>

export const GlobalContext = createContext<UseGlobalManagerResult>({
    state: { banks: [] },
    addBanks: () => {},
    toggleFavorite: () => {},
})

function globalReducer(state: State, action: Action) {
    switch (action.type) {
        case 'AddBanks':
            return {
                ...state,
                banks: action.banks,
            }

        case 'ToggleFavorite':
            return {
                banks: state.banks.map((bank) =>
                    bank.ifsc === action.ifsc
                        ? { ...bank, favorite: !bank.favorite }
                        : bank
                ),
            }
        default:
            throw new Error()
    }
}

function useGlobalManager(initialState: State): {
    state: State
    addBanks: (banks: Bank[]) => void
    toggleFavorite: (ifsc: string) => void
} {
    const [state, dispatch] = useReducer(globalReducer, initialState)

    const addBanks = useCallback((banks: Bank[]) => {
        dispatch({ type: 'AddBanks', banks })
    }, [])

    const toggleFavorite = useCallback((ifsc: string) => {
        dispatch({ type: 'ToggleFavorite', ifsc })
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
