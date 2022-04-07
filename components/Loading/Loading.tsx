import React from 'react'

const LoadingBox = () => {
    return (
        <div className="grid grid-cols-4 gap-6 mb-6 ">
            <div className="rounded-lg h-7 bg-neutral-200"></div>
            <div className="rounded-lg h-7 bg-neutral-200"></div>
            <div className="rounded-lg h-7 bg-neutral-200"></div>
            <div className="rounded-lg h-7 bg-neutral-200"></div>
        </div>
    )
}

const Loading = () => {
    return (
        <div className="animate-pulse">
            <LoadingBox />
            <LoadingBox />
            <LoadingBox />
            <LoadingBox />
            <LoadingBox />
            <LoadingBox />
        </div>
    )
}

export default Loading
