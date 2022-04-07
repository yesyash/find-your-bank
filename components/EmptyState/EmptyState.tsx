import React from 'react'
import { Inbox } from 'react-feather'

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full pt-40">
            <Inbox width={48} height={48} className="mb-8" />
            <h3 className="mb-3 text-3xl font-bold">Oops, nothing here.</h3>
            <p>Try adjusting your search or filters.</p>
        </div>
    )
}

export default EmptyState
