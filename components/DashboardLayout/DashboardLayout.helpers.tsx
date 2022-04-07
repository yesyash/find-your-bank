import { Dispatch, SetStateAction } from 'react'
import { Bank } from '@/types/bank'
import { categories } from '@/constants'

/*
    Filters the table data depending on the value 
    given in the input field
*/
export function handleSearch(
    e: any,
    firstBankIndex: number,
    lastBankIndex: number,
    allBanksList: Bank[],
    tableData: Bank[],
    setTableData: Dispatch<SetStateAction<Bank[]>>,
    category: string
) {
    e.preventDefault()
    let value = String(e.target.value).toLowerCase()

    if (value === '') {
        setTableData(tableData)
        return
    }

    switch (category) {
        case categories[0].value:
            let bankNameList = allBanksList.filter((bank) =>
                bank.bank_name.toLowerCase().includes(value)
            )

            if (bankNameList.length === 0) {
                setTableData([])
            } else {
                setTableData(bankNameList.splice(firstBankIndex, lastBankIndex))
            }

            return

        case categories[1].value:
            let ifscList = allBanksList.filter((bank) =>
                bank.ifsc.toLowerCase().includes(value)
            )

            if (ifscList.length === 0) {
                setTableData([])
            } else {
                setTableData(ifscList)
            }

            return

        case categories[2].value:
            let bankIdList = allBanksList.filter(
                (bank) => bank.bank_id === Number(value)
            )

            if (bankIdList.length === 0) {
                setTableData([])
            } else {
                setTableData(bankIdList)
            }

            return

        case categories[3].value:
            let categoriesList = allBanksList.filter((bank) =>
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
