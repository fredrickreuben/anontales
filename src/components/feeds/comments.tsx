import { useFetchCommentsQuery } from '@anontales/domain/api/comments'
import CommentsSkeleton from './skeleton/comments'
import CreateComment from './create-comments'
import Comment from './comment'
import React, { useEffect } from 'react'
import useSearch from '@anontales/hooks/use-search'

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

    return (
        <div className="flex flex-col w-full">
            {userId && <CreateComment taleId={taleId} userId={userId} />}
            {isLoading ? <CommentsSkeleton taleId={taleId} /> : comments?.map(comment => <Comment {...comment} />)}
        </div>
    )
}

export default FeedComment
