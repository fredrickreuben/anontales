import { Skeleton } from '@anontales/components/ui/skeleton'
import React from 'react'

const FeedSkeleton = () => {
    return (
        <div className="p-4">
            <div className="flex gap-2 items-center">
                <Skeleton className="h-[45px] w-[45px] rounded-full" />
                <div className="flex flex-col flex-grow justify-around">
                    <Skeleton className="h-[18px] w-[300px] rounded-md" />
                    <div className='h-2'></div>
                    <Skeleton className="h-[10px] w-full rounded-md" />
                </div>
            </div>
            <Skeleton className="h-[250px] w-full my-3 rounded-md" />
        </div>
    )
}

export default FeedSkeleton
