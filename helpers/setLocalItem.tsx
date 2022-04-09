import { LocalItem } from '@/types/localItem'

import { getLocalItem } from './getLocalItem'

type Params = Omit<LocalItem, 'expiry'>
type Result = 'success' | 'error'

// Adds a set number of hours to current time and returns the future date in unix time.
function getFutureDate(hours: number) {
    return new Date(new Date().getTime() + 60 * 60 * hours + 1000).getTime()
}

/**
 * Sets a value to the localstorage along with expiry time of 24hrs
 * and then checks if the item is properly set.
 * ----------
 * @param Key : string & value : object | Array<any>
 * @returns message : "success" | "error"
 */
export const setLocalItem = ({ key, value }: Params): Result => {
    let tokenisedValue = { expiry: getFutureDate(24), value: value }

    localStorage.setItem(key, JSON.stringify(tokenisedValue))

    if (getLocalItem(key)) {
        return 'success'
    } else {
        return 'error'
    }
}
