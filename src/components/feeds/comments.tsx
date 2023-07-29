import { useFetchCommentsQuery } from '@anontales/domain/api/comments'
import useSearch from '@anontales/hooks/use-search'
import CommentsSkeleton from '../skeleton/comments'
import CreateComment from './create-comments'
import React, { useEffect } from 'react'
import Comment from './comment'

interface FeedCommentProp extends React.HTMLAttributes<HTMLElement> {
    taleId: string
    userId: string | null | undefined
}

const FeedComment = ({ taleId, userId }: FeedCommentProp) => {
    const { data: comments, isLoading, isError, refetch } = useFetchCommentsQuery({ limit: 10, query: taleId })

    const { search, setSearch } = useSearch({ limit: 10, query: taleId }, refetch)

    useEffect(() => {
        if (comments) setSearch(state => ({ ...state, last: comments[comments.length - 1] }))
    }, [comments])

    useEffect(() => {
        refetch()
    }, [search, refetch])

    return (
        <div className="flex flex-col w-full">
            {userId && <CreateComment taleId={taleId} userId={userId} />}
            {isLoading ? <CommentsSkeleton taleId={taleId} /> : comments?.map(comment => <Comment {...comment} />)}
        </div>
    )
}

export default FeedComment
