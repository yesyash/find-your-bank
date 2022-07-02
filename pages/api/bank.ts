import { Bank } from '@/types/bank'
import { NextApiRequest, NextApiResponse } from 'next'
import fsPromises from 'fs/promises'

interface IData {
    count: number
    results: {
        ifsc: string
        bank_id: string
        branch: string
        address: string
        city: string
        district: string
        state: string
        bank_name: string
    }[]
}

/**
 * api endpoint: /api/bank?city=<city>&ifsc=<ifsc>
 * -------
 * if ifsc is not provided api will return all banks present in the given city.
 * */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const jsonData = await fsPromises.readFile('./data.json')

        let data: IData = JSON.parse(jsonData.toString())

        let { city, ifsc } = req.query
        city = city.toString().toLowerCase() ?? 'hyderabad'

        let filteredByCity = data.results.filter(
            (bank) => bank.city.toLowerCase() === city
        )

        let filteredBanks = ifsc
            ? filteredByCity.filter(
                  (bank) =>
                      bank.ifsc.toLowerCase() === ifsc.toString().toLowerCase()
              )
            : filteredByCity

        res.setHeader('Cache-control', 'max-age=0, s-maxage=86400')
        res.status(200).json({ banks: filteredBanks })
    }
}
