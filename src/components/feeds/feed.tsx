import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useFetchUserQuery } from '@anontales/domain/api/users'
import { Badge, badgeVariants } from '../ui/badge'
import UserAvatar from '../helpers/user-avatar'
import { Transition } from '@headlessui/react'
import Output from 'editorjs-react-renderer'
import EditFeedEditor from './edit-editor'
import { cn } from '@anontales/lib/utils'
import { Icons } from '../helpers/icons'
import React, { useState } from 'react'
import { Tale } from '../../../types'
import { Button } from '../ui/button'
import FeedComment from './comments'

interface FeedProps extends React.HTMLAttributes<HTMLElement> {
    tale: Tale
    userId: string | null | undefined
}

const Feed = ({ tale, userId }: FeedProps) => {
    const { data: user } = useFetchUserQuery(tale.userId)

    const [editting, setEdtting] = useState<boolean>(false)

    const [showComments, setShowComments] = useState<boolean>(false)

    const onEdit = (e: any) => {
        setEdtting(true)
    }

    const onSaved = () => {
        setEdtting(false)
    }

    const onShowComments = () => {
        setShowComments(!showComments)
    }

    return (
        <div className="p-5">
            <Card className="border-none bg-muted">
                <CardHeader className="px-6 pt-6 pb-0">
                    <CardTitle className="flex">
                        <UserAvatar user={user} className='h-10 w-10' />
                        <div className="flex-grow">{user?.username}</div>
                        {userId == tale.userId && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                                        <Icons.moreVerticalIcon className="text-muted-foreground" />
                                        <span className="sr-only">More Trigger</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={onEdit}>
                                        <Icons.fileEdit className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-6">{editting ? <EditFeedEditor tale={tale} userId={userId} onSaved={onSaved} /> : <Output data={tale.content} />}</CardContent>
                <CardFooter className="px-6 flex-col items-start py-4 border-t-2 border-background border-opacity-0">
                    <div className="flex items-start w-full space-y-2 gap-2 justify-between hover:opacity-50 transition-all duration-500">
                        <Badge className={cn(badgeVariants({ variant: 'ghost' }), 'px-4 py-2 cursor-pointer')} onClick={onShowComments}>
                            <span className="px-1">24</span>
                            Comments
                        </Badge>
                    </div>
                    <div className="overflow-hidden w-full">
                        <Transition
                            show={showComments}
                            enter="transition-all ease-out duration-300"
                            enterFrom="transform -translate-y-full"
                            enterTo="transform translate-y-0"
                            leave="transition-all ease-in duration-300"
                            leaveFrom="transform translate-y-0"
                            leaveTo="transform -translate-y-full"
                            className={'overflow-hidden w-full'}
                        >
                            <FeedComment taleId={tale.id} userId={userId} />
                        </Transition>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Feed
