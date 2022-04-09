import { Bank } from '@/types/bank'
import { categories, cities } from './Dashboard.constants'

import { DashboardState } from './Dashboard.types'

type State = DashboardState
type Action =
    | { type: 'updateTableData'; banks: Bank[] }
    | { type: 'updateCity'; city: typeof cities[0] }
    | { type: 'updateCategory'; category: typeof categories[0] }

export const dashboardReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'updateTableData':
            return { ...state, tableData: action.banks }

        case 'updateCity':
            return { ...state, city: action.city }

        case 'updateCategory':
            return { ...state, category: action.category }

        default:
            throw new Error()
    }
}

export const handleDropdown = (type: 'city' | 'category' | 'rows') => {}
