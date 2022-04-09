export const useDebounce = (fn: (...args: any) => any, delay: number) => {
    let timeout: any
    return (...args: any) => {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
