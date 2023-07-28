import FeedSkeleton from './feed'
import React from 'react'

const FeedsSkeleton = () => {
    const dummy = new Array(10).fill(0)
    return (
        <div className="w-full">
            {dummy.map((tale, index) => (
                <FeedSkeleton key={index} />
            ))}
        </div>
    )
}

export default FeedsSkeleton
