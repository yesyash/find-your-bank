import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
} from 'react'
import { Bank } from '@/types/bank'

type Action = { type: 'ADD'; data: Array<Bank> }
type UseBankManagerResult = ReturnType<typeof useBankManager>

const BankContext = createContext<UseBankManagerResult>({
    bankList: [],
    addBanks: () => {},
})

function bankReducer(state: Bank[], action: Action) {
    switch (action.type) {
        case 'ADD':
            let local
            return action.data

        default:
            throw new Error()
    }
}

function useBankManager(initialList: Bank[]): {
    bankList: Bank[]
    addBanks: (data: Bank[]) => void
} {
    const [bankList, dispatch] = useReducer(bankReducer, initialList)

    const addBanks = useCallback((data: Bank[]) => {
        dispatch({ type: 'ADD', data: data })
    }, [])

    return { bankList, addBanks }
}

export const BankProvider: React.FC<{
    initialList: Bank[]
    children: React.ReactNode
}> = ({ initialList, children }) => (
    <BankContext.Provider value={useBankManager(initialList)}>
        {children}
    </BankContext.Provider>
)

export const useBank = (): Bank[] => {
    const { bankList } = useContext(BankContext)

    return bankList
}

export const useAddBank = (): UseBankManagerResult['addBanks'] => {
    const { addBanks } = useContext(BankContext)

    return addBanks
}
