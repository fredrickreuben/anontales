import { Skeleton } from '@anontales/components/ui/skeleton'
import React from 'react'

const AuthSkeleton = () => {
    return (
        <div className="w-full">
            <div className="w-2/3 mx-auto h-32">
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        </div>
    )
}

export default AuthSkeleton
