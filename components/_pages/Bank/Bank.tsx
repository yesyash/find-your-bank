import { useBank } from '@/hooks/useBank'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ArrowLeft } from 'react-feather'

const Detail = ({ heading, value }: { heading: string; value: string }) => {
    return (
        <div className="flex items-center mb-2">
            <h4 className="w-24 font-semibold">{heading}:</h4>
            <span>{value}</span>
        </div>
    )
}

const Bank: NextPage = () => {
    const router = useRouter()

    const bankList = useBank()
    const bankDetails = bankList.filter(
        (bank) => bank.ifsc === router.query?.ifsc
    )[0]

    function pushBack() {
        router.push('/')
    }

    return (
        <>
            <main className="px-32 py-16">
                <button
                    className="flex items-center pb-8 mb-8 group text-neutral-600 hover:text-neutral-900"
                    onClick={pushBack}
                >
                    <ArrowLeft
                        width={20}
                        height={20}
                        className="transition duration-300 group-hover:-translate-x-1"
                    />
                    <span className="ml-2 ">Back</span>
                </button>

                <div>
                    <h1 className="mb-3 text-2xl font-bold lowercase first-letter:capitalize">
                        {bankDetails.bank_name}
                    </h1>

                    <div className="flex items-center pb-4 mb-4 text-sm tracking-wide text-neutral-500">
                        <span className="">Id: {bankDetails.bank_id}</span>
                        <span className="mx-4">|</span>
                        <span className="">IFSC: {bankDetails.ifsc}</span>
                    </div>

                    <Detail heading="Branch" value={bankDetails.branch} />
                    <Detail heading="State" value={bankDetails.state} />
                    <Detail heading="City" value={bankDetails.city} />
                    <Detail heading="District" value={bankDetails.district} />
                    <Detail heading="Address" value={bankDetails.address} />
                </div>
            </main>
        </>
    )
}

export default Bank
