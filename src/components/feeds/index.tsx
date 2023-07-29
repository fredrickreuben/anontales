import { useFetchTalesQuery } from '@anontales/domain/api/tales'
import useSearch from '@anontales/hooks/use-search'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import FeedsSkeleton from '../skeleton'
import Error from '../helpers/error'
import Feed from './feed'

interface FeedsProp extends React.HTMLAttributes<HTMLElement> {}

const Feeds = ({}: FeedsProp) => {
    const { userId } = useAuth()

    const { data: tales, isLoading, isError, refetch } = useFetchTalesQuery({ limit: 10, query: '' })

    const { search, setSearch } = useSearch({ limit: 10, query: '' }, refetch)

    useEffect(() => {
        if (tales) setSearch(state => ({ ...state, last: tales[tales.length - 1] }))
    }, [tales, setSearch])

    return (
        <div className="w-full">
            {(!tales || tales?.length == 0) && isLoading ? (
                <FeedsSkeleton />
            ) : tales && tales?.length > 0 ? (
                tales.map(tale => <Feed key={tale.id} tale={tale} userId={userId} />)
            ) : isError ? (
                <Error title="No Results Found!" description="There is currently no tales no dispaly!" />
            ) : (
                <Error title="No Results Found!" description="There is currently no tales no dispaly!" />
            )}
        </div>
    )
}

export default Feeds
