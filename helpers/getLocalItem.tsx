import { LocalItem } from '@/types/localItem'

type LocalData = Omit<LocalItem, 'key'>
type Result = LocalData | null

/**
 * Checks if a item is existing in the localstate and is not expired.
 * --------
 * @param key : string
 * @returns parsedData | null
 */
export const getLocalItem = (key: LocalItem['key']): Result => {
    let data = localStorage.getItem(key)

    if (data) {
        let parsedData: LocalData = JSON.parse(data)

        if (parsedData.expiry <= new Date().getTime()) {
            return null
        }

        return parsedData
    } else {
        return null
    }
}
