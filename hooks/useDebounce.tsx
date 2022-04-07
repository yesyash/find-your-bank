import { useEffect, useState } from 'react'

export const useDebounce = (value: string, dealy: number) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)

            return () => {
                clearTimeout(handler)
            }
        }, dealy)
    }, [value, dealy])

    return debounceValue
}
