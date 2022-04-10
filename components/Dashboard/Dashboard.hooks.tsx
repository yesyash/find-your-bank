import React from 'react'

import { Bank } from '@/types/bank'

import { dashboardReducer } from './Dashboard.helpers'
import { DashboardState } from './Dashboard.types'

interface Res {
    state: DashboardState
    updateTable: (banks: Bank[]) => void
    updateCategory: (category: DashboardState['category']) => void
    updateIndexes: (indexes: DashboardState['indexes']) => void
}

export const useDashboardManager = (initialState: DashboardState): Res => {
    const [state, dispatch] = React.useReducer(dashboardReducer, initialState)

    const updateTable = React.useCallback((banks: Bank[]) => {
        dispatch({ type: 'updateTableData', banks })
    }, [])

    const updateCategory = React.useCallback(
        (category: DashboardState['category']) => {
            dispatch({ type: 'updateCategory', category })
        },
        []
    )

    const updateIndexes = React.useCallback(
        (indexes: DashboardState['indexes']) => {
            dispatch({ type: 'updateIndexes', indexes })
        },
        []
    )

    return {
        state,
        updateTable,
        updateCategory,
        updateIndexes,
    }
}
