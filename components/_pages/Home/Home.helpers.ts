import { useAddBank } from '@/hooks/useBank'
import { Bank } from '@/types/bank'
import { Dispatch, SetStateAction } from 'react'

export async function getBankList(city: string): Promise<Array<Bank>> {
    const url = `https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase()}`
    const res = await fetch(url)
    const bankList: Array<Bank> = await res.json()
    return bankList
}

export async function loadBankList(
    city: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setBankList: (data: Bank[]) => void
) {
    setLoading(true)

    const data = await getBankList(city)
    setBankList(data)

    setLoading(false)
}
