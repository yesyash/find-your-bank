import { ChangeEvent } from 'react'

import { Bank } from '@/types/bank'
import { categories } from './Dashboard.constants'

import { DashboardState } from './Dashboard.types'

type State = DashboardState
type Action =
    | { type: 'updateTableData'; banks: Bank[] }
    | { type: 'updateCity'; city: DashboardState['city'] }
    | { type: 'updateCategory'; category: DashboardState['category'] }
    | { type: 'updateIndexes'; indexes: DashboardState['indexes'] }

export const dashboardReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'updateTableData':
            return { ...state, tableData: action.banks }

        case 'updateCity':
            return { ...state, city: action.city }

        case 'updateCategory':
            return { ...state, category: action.category }

        case 'updateIndexes':
            return { ...state, indexes: action.indexes }
        default:
            throw new Error()
    }
}

export const handleSearch = (
    e: ChangeEvent<HTMLInputElement>,
    category: string,
    indexes: DashboardState['indexes'],
    allBanks: Bank[],
    updateTableData: (banks: Bank[]) => void
) => {
    e.preventDefault()
    let value = String(e.target.value).toLowerCase()

    if (value === '') {
        let bankList = [...allBanks]
        updateTableData(bankList.splice(indexes.start, indexes.end))
        return
    }

    switch (category) {
        case categories[0].value:
            let bankNameList = allBanks.filter((bank) =>
                bank.bank_name.toLowerCase().includes(value)
            )

            if (bankNameList.length === 0) {
                updateTableData([])
            } else {
                console.log('inside else')
                updateTableData(bankNameList.splice(indexes.start, indexes.end))
            }

            return

        case categories[1].value:
            let ifscList = allBanks.filter((bank) =>
                bank.ifsc.toLowerCase().includes(value)
            )

            if (ifscList.length === 0) {
                updateTableData([])
            } else {
                updateTableData(ifscList)
            }

            return

        case categories[2].value:
            let bankIdList = allBanks.filter(
                (bank) => bank.bank_id === Number(value)
            )

            if (bankIdList.length === 0) {
                updateTableData([])
            } else {
                updateTableData(bankIdList)
            }

            return

        case categories[3].value:
            let categoriesList = allBanks.filter((bank) =>
                bank.branch.toLowerCase().includes(value)
            )

            if (categoriesList.length === 0) {
                updateTableData([])
            } else {
                updateTableData(categoriesList)
            }

            return
        default:
            return
    }
}
