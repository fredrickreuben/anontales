'use client'

import { useUpdateTaleMutation } from '@anontales/domain/api/tales'
import React, { useEffect } from 'react'
import Editor from '../helpers/editor'
import { Tale } from '../../../types'

interface FeedEditor extends React.HTMLAttributes<HTMLElement> {
    tale: Tale
    userId: string | null | undefined
    onSaved: () => void
}

const EditFeedEditor = ({ tale, userId, onSaved }: FeedEditor) => {
    const [updateTale, { data, isLoading, isSuccess, isError }] = useUpdateTaleMutation()

    const onSaveContent = (data: any) => {
        if (!userId) return
        updateTale({ ...tale, content: data })
    }

    useEffect(() => {
        if (!isSuccess) return
        onSaved()
    }, [isSuccess])

    return <Editor loading={isLoading} success={isSuccess} isEdit={true} content={tale?.content} onSave={onSaveContent} />
}

export default EditFeedEditor
