import { DashboardState } from './Dashboard.types'

export const categories = [
    { id: 1, value: 'Bank Name', unavailable: false },
    { id: 2, value: 'IFSC', unavailable: false },
    { id: 3, value: 'Bank Id', unavailable: false },
    { id: 4, value: 'Branch', unavailable: false },
]

// Initial state for reducer
export const initialState: DashboardState = {
    tableData: [],
    category: categories[0],
    indexes: { start: 0, end: 5 },
}
