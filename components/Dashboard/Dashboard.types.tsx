import { Bank } from '@/types/bank'
import { categories } from './Dashboard.constants'

export interface DashboardState {
    tableData: Bank[]
    category: typeof categories[0]
    indexes: { start: number; end: number }
}
