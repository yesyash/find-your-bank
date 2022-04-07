import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
} from 'react'
import { Bank } from '@/types/bank'

type Action =
    | { type: 'ADD'; data: Array<Bank> }
    | { type: 'UPDATE'; city: string; ifsc: string }
type UseBankManagerResult = ReturnType<typeof useBankManager>

const BankContext = createContext<UseBankManagerResult>({
    bankList: [],
    addBanks: () => {},
    updateBank: () => {},
})

function bankReducer(state: Bank[], action: Action) {
    switch (action.type) {
        case 'ADD':
            return action.data
        case 'UPDATE':
            let localData = localStorage.getItem(action.city)

            if (localData !== undefined && localData !== null) {
                let copy: Bank[] = JSON.parse(localData)
                let index = copy.findIndex((bank) => bank.ifsc === action.ifsc)

                if (index >= 0) {
                    copy[index].favorite = true
                }

                return copy
            } else {
                let copy = [...state]
                let index = copy.findIndex((bank) => bank.ifsc === action.ifsc)
                if (index >= 0) {
                    copy[index].favorite = true
                }

                return copy
            }
        default:
            throw new Error()
    }
}

function useBankManager(initialList: Bank[]): {
    bankList: Bank[]
    addBanks: (data: Bank[]) => void
    updateBank: (ifsc: string, city: string) => void
} {
    const [bankList, dispatch] = useReducer(bankReducer, initialList)

    const addBanks = useCallback((data: Bank[]) => {
        dispatch({ type: 'ADD', data: data })
    }, [])

    const updateBank = useCallback((ifsc: string, city: string) => {
        dispatch({ type: 'UPDATE', ifsc: ifsc, city: city })
    }, [])

    return { bankList, addBanks, updateBank }
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

export const useUpdateBank = (): UseBankManagerResult['updateBank'] => {
    const { updateBank } = useContext(BankContext)

    return updateBank
}
