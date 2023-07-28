import { useCreateCommentMutation } from '@anontales/domain/api/comments'
import React, { useEffect, useId, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@anontales/lib/utils'
import { nanoid } from '@reduxjs/toolkit'
import { Icons } from '../helpers/icons'
import { Comment } from '../../../types'

interface FeedCommentProp extends React.HTMLAttributes<HTMLElement> {
    taleId: string
    userId: string
}

const CreateComment = ({ taleId, userId }: FeedCommentProp) => {
    const [comment, setComment] = useState<Comment>({
        id: '',
        taleId,
        message: '',
        userId,
    })

    const commentId = useId()

    const [createComment, { isLoading }] = useCreateCommentMutation()

    const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
        setComment(state => ({ ...state, message: e?.target.value ?? '' }))
    }

    const onSaveComment = () => {
        createComment({ ...comment, id: nanoid() })
    }

    useEffect(() => {
        if (!isLoading)
            setComment({
                id: '',
                taleId,
                message: '',
                userId,
            })
    }, [isLoading])

    return (
        <div className="py-1">
            <div className="relative">
                <TextareaAutosize
                    autoFocus
                    id={commentId}
                    value={comment.message}
                    placeholder="Type comment..."
                    className="w-full resize-none appearance-none overflow-hidden px-5 py-4 rounded-xl mt-3 bg-background text-sm font-bold focus:outline-none"
                    onChange={onCommentChange}
                />
                <Button className={cn(buttonVariants({ variant: 'secondary' }), 'p-2 absolute end-2 bottom-2 z-50')} onClick={onSaveComment}>
                    {isLoading && <Icons.spinner className="animate-spin text-foreground" />}
                    {!isLoading && <Icons.SendHorizonal className="text-foreground" />}
                </Button>
            </div>
        </div>
    )
}

export default CreateComment
