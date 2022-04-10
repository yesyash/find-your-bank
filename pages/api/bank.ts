import { Bank } from '@/types/bank'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * api endpoint: /api/bank?city=<city>&ifsc=<ifsc>
 * -------
 * By default the api will search for ifsc codes in mumbai
 * a city param can be added to the api to search for a specific city
 * */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        let { city } = req.query
        city = city ?? 'MUMBAI'
        let { ifsc } = req.query
        let ifsCode = ifsc.toString().toLowerCase()
        let response = await fetch(
            `https://vast-shore-74260.herokuapp.com/banks?city=${city
                .toString()
                .toUpperCase()}`
        )
        let banks: Array<Bank> = await response.json()
        let filteredBanks = banks.filter((bank) => {
            if (bank.ifsc.toLowerCase().includes(ifsCode)) return bank
        })
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400')
        res.status(200).json({ banks: filteredBanks })
    }
}
