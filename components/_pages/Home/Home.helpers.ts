import { Dispatch, SetStateAction } from 'react'

import { Bank } from '@/types/bank'
import { categories } from './Home.constants'

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

export function handleSearch(
    e: any,
    tableData: Bank[],
    setTableData: Dispatch<SetStateAction<Bank[]>>,
    category: string
) {
    e.preventDefault()
    let value = String(e.target.value)

    if (value === '') {
        setTableData(tableData)
        return
    }

    switch (category) {
        case categories[0].value:
            let bankNameList = tableData.filter((bank) =>
                bank.bank_name.toLowerCase().includes(value)
            )

            if (bankNameList.length === 0) {
                setTableData([])
            } else {
                setTableData(
                    tableData.filter((bank) =>
                        bank.bank_name.toLowerCase().includes(value)
                    )
                )
            }

            return

        case categories[1].value:
            let ifscList = tableData.filter((bank) =>
                bank.ifsc.toLowerCase().includes(value)
            )

            if (ifscList.length === 0) {
                setTableData([])
            } else {
                setTableData(ifscList)
            }

            return

        case categories[2].value:
            let bankIdList = tableData.filter(
                (bank) => bank.bank_id === Number(value)
            )

            if (bankIdList.length === 0) {
                setTableData([])
            } else {
                setTableData(bankIdList)
            }

            return

        case categories[3].value:
            let categoriesList = tableData.filter((bank) =>
                bank.branch.toLowerCase().includes(value)
            )

            if (categoriesList.length === 0) {
                setTableData([])
            } else {
                setTableData(categoriesList)
            }

            return
        default:
            return
    }
}
