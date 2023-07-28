import '@anontales/assets/styles/editor.css'

import { talePatchSchema } from '@anontales/lib/validation/tale'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { FormProvider, useForm } from 'react-hook-form'
import EditorSkeleton from '../feeds/skeleton/editor'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@anontales/lib/utils'
import React, { useId } from 'react'
import { Icons } from './icons'
import { z } from 'zod'

interface EditorProps extends React.HTMLAttributes<HTMLElement> {
    content: any
    loading: boolean
    success: boolean
    isEdit: boolean
    onSave: (data: OutputData) => void
}

type FormData = z.infer<typeof talePatchSchema>

const Editor = ({ loading, content, success, isEdit, className, onSave, ...props }: EditorProps) => {
    const buttonId = useId()
    const editorId = useId()
    
    const ref = React.useRef<EditorJS>()

    const methods = useForm<FormData>({
        resolver: zodResolver(talePatchSchema),
    })

    const [isMounted, setIsMounted] = React.useState<boolean>(false)

    const initializeEditor = React.useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default

        const body = talePatchSchema.parse({ content })

        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorId,
                onReady: () => {
                    ref.current = editor
                },
                placeholder: 'Type here to write your post...',
                data: body.content,
            })
        }
    }, [content])

    React.useEffect(() => {
        if (typeof window !== 'undefined') setIsMounted(true)
    }, [])

    React.useEffect(() => {
        if (!isMounted) return
        initializeEditor()
        return () => {
            ref.current?.destroy()
            ref.current = undefined
        }
    }, [isMounted, initializeEditor])

    React.useEffect(() => {
        if (!success) return
        ref.current?.clear()
    }, [success])

    const onSubmit = async (d: FormData) => {
        const data = await ref.current?.save()
        if (data) onSave(data)
    }

    if (!isMounted) {
        return (
            <div className="px-4">
                <EditorSkeleton />
            </div>
        )
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={cn('grid w-full gap-10', className)}>
                    <div className="prose w-full prose-stone mx-auto dark:prose-invert">
                        <div id={editorId} className="w-full" />
                        <div className="justify-between">
                            <Button id={buttonId} type="submit" disabled={loading} className={cn(buttonVariants({ variant: 'secondary' }), 'w-full my-4')}>
                                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                {!loading && isEdit && <span>Save Tale</span>}
                                {!loading && !isEdit && <span>Create Tale</span>}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}

export default Editor
