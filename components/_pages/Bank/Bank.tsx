import { useAddBank, useBank } from '@/hooks/useBank'
import { useRouter } from 'next/router'
import React from 'react'

const Bank = () => {
    const router = useRouter()

    const bankList = useBank()

    function handleBack() {
        router.push('/')
    }
    return (
        <>
            <button onClick={handleBack}>back</button>
            <br />

            <pre>
                {bankList.map(
                    (bank) =>
                        bank.ifsc === router.query?.ifsc &&
                        JSON.stringify(bank, null, 4)
                )}
            </pre>
        </>
    )
}

export default Bank
