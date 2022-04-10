import React from 'react'

import { GlobalContext } from '@/context/global.context'

export const useCity = () => {
    const { state } = React.useContext(GlobalContext)
    return state.city
}

export const useUpdateCity = () => {
    const { updateCity } = React.useContext(GlobalContext)
    return updateCity
}
