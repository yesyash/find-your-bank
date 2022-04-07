import { Dispatch, SetStateAction } from 'react'

import { Bank } from '@/types/bank'

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
    city = city.toLowerCase()

    setLoading(true)
    let localData = localStorage.getItem(city)

    if (localData != undefined) {
        let data: Bank[] = JSON.parse(localData)
        setBankList(data)
    } else {
        const data = await getBankList(city)
        const finalData = data.map((item) => ({ ...item, favorite: false }))

        localStorage.setItem(city, JSON.stringify(finalData))

        setBankList(data)
    }

    setLoading(false)
}
