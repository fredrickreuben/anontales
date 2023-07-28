import UserAvatar from '../helpers/user-avatar'
import { Comment } from '../../../types'
import React from 'react'
import { useFetchUserQuery } from '@anontales/domain/api/users'

interface CommentProp extends React.HTMLAttributes<HTMLElement> {}

const comment = ({ userId, message }: CommentProp & Comment) => {

    const { data: user } = useFetchUserQuery(userId)

    return (
        <div className="py-1">
            <div className="flex gap-2">
                <UserAvatar user={user} className='h-8 w-8' />
                <div className="flex-grow">
                    <h5 className='text-foreground'>{user?.username}</h5>
                    <p className='text-muted-foreground text-sm'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default comment
