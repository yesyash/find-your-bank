// fetcher for swr
export const fetcher = async (url: string) => {
    try {
        let res = await fetch(url)
        let data = await res.json()

        return data.banks
    } catch (error) {
        return error
    }
}
