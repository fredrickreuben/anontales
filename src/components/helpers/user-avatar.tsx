import { Avatar, AvatarFallback, AvatarImage, AvatarProps } from '@radix-ui/react-avatar'
import { User } from '@clerk/nextjs/server'
import { Icons } from './icons'
import { cn } from '@anontales/lib/utils'

interface UserAvatarProps extends AvatarProps {
    user?: Pick<User, 'imageUrl' | 'username'>
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            {user?.imageUrl ? (
                <AvatarImage className={cn('h-6 w-6', props.className)} alt={user.username ?? 'Picture'} src={user.imageUrl} />
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{user?.username}</span>
                    <Icons.user className={cn('h-10 w-10 p-2 rounded-full bg-muted-foreground', props.className)} />
                </AvatarFallback>
            )}
        </Avatar>
    )
}

export default UserAvatar
