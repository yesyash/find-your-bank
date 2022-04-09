import React from 'react'
import useSWR from 'swr'

import { useAddBanks, useBank } from '@/hooks/useBank'
import { useFavorite, useToggleFavorite } from '@/hooks/useFavorite'
import { Bank } from '@/types/bank'
import { setLocalItem } from '@/helpers/setLocalItem'
import { getLocalItem } from '@/helpers/getLocalItem'
import Hyperlink from '@/components/Hyperlink'

const Simple = () => {
    const banks = useBank()
    const favorites = useFavorite()

    const addBanks = useAddBanks()
    const toggleFavorite = useToggleFavorite()

    const { data, error } = useSWR('api', fetcher)

    async function fetcher() {
        try {
            const response = await fetch(
                'https://vast-shore-74260.herokuapp.com/banks?city=BANGLORE'
            )
            const data: Omit<Bank, 'favorite'>[] = await response.json()

            return data
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    function addData() {
        if (error === undefined && data !== undefined) {
            let finalData = data.map((item) => ({ ...item, favorite: false }))

            addBanks('banglore', finalData)

            let status = setLocalItem({ key: 'banglore', value: finalData })
            console.log(status)
        }
    }

    function addFavorite(ifsc: string) {
        toggleFavorite('banglore', ifsc)
    }

    return (
        <div className="m-16">
            <Hyperlink className="block my-8 underline" href="/all-banks">
                all banks
            </Hyperlink>

            <div className="grid grid-cols-2 overflow-auto gird max-h-96">
                <div>
                    <pre>{JSON.stringify(banks, null, 4)}</pre>
                </div>

                <div>
                    <pre>{JSON.stringify(favorites, null, 4)}</pre>
                </div>
            </div>

            <button
                className="px-4 py-1 mt-8 text-white transition duration-300 transform rounded-lg bg-slate-900 focus:scale-95"
                onClick={addData}
            >
                Add data
            </button>

            <button
                className="px-4 py-1 mt-8 ml-4 text-white transition duration-300 transform rounded-lg bg-slate-900 focus:scale-95"
                onClick={() => addFavorite('JAKA0ZOBANG')}
            >
                Add favorite
            </button>
        </div>
    )
}

export default Simple
