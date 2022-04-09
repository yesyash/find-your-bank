import { Bank } from '@/types/bank'
import { categories, cities } from './Dashboard.constants'

export interface DashboardState {
    tableData: Bank[]
    city: typeof cities[0]
    category: typeof categories[0]
    indexes: { start: number; end: number }
}
