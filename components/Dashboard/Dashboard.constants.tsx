import { DashboardState } from './Dashboard.types'

export const cities = [
    { id: 1, value: 'Banglore', unavailable: false },
    { id: 2, value: 'Chennai', unavailable: false },
    { id: 3, value: 'Hyderabad', unavailable: false },
    { id: 4, value: 'Mumbai', unavailable: false },
    { id: 5, value: 'Pune', unavailable: false },
]

export const categories = [
    { id: 1, value: 'Bank Name', unavailable: false },
    { id: 2, value: 'IFSC', unavailable: false },
    { id: 3, value: 'Bank Id', unavailable: false },
    { id: 4, value: 'Branch', unavailable: false },
]

// Initial state for reducer
export const initialState: DashboardState = {
    tableData: [],
    city: cities[0],
    category: categories[0],
    indexes: { start: 0, end: 5 },
}
