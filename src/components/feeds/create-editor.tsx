'use client'

import { useCreateTaleMutation } from '@anontales/domain/api/tales'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Editor from '../helpers/editor'

interface FeedEditor extends React.HTMLAttributes<HTMLElement> {}

const CreateFeedEditor = ({ }: FeedEditor) => {
    
    const { userId } = useAuth()

    const [createTale, { data: tale, isLoading, isSuccess, isError }] = useCreateTaleMutation()

    const onSaveContent = (data: any) => {
        if (!userId) return
        createTale({ id: nanoid(), content: data, userId, published: true })
    }

    return <Editor loading={isLoading} success={isSuccess} isEdit={false}  content={tale?.content} onSave={onSaveContent} />
}

export default CreateFeedEditor
