import React from 'react'

import { Bank } from '@/types/bank'

import { categories, cities } from './Dashboard.constants'
import { dashboardReducer } from './Dashboard.helpers'
import { DashboardState } from './Dashboard.types'

interface Res {
    state: DashboardState
    updateTable: (banks: Bank[]) => void
    updateCity: (city: typeof cities[0]) => void
    updateCategory: (category: typeof categories[0]) => void
}

export const useDashboardManager = (initialState: DashboardState): Res => {
    const [state, dispatch] = React.useReducer(dashboardReducer, initialState)

    const updateTable = React.useCallback((banks: Bank[]) => {
        dispatch({ type: 'updateTableData', banks })
    }, [])

    const updateCity = React.useCallback((city: typeof cities[0]) => {
        dispatch({ type: 'updateCity', city })
    }, [])

    const updateCategory = React.useCallback(
        (category: typeof categories[0]) => {
            dispatch({ type: 'updateCategory', category })
        },
        []
    )

    return {
        state,
        updateTable,
        updateCity,
        updateCategory,
    }
}
