import { Skeleton } from '@anontales/components/ui/skeleton'

interface CommentsSkeletonProp{
    taleId: string
}

const CommentsSkeleton = ({taleId}:CommentsSkeletonProp) => {
    const dummy = new Array(10).fill(0)

    return (
        <div className="py-4">
            {dummy.map((tale, index) => (
                <div key={`${taleId}-${index}`} className="flex gap-2 items-center py-1">
                    <Skeleton className="h-[45px] w-[45px] rounded-full bg-muted-foreground" />
                    <div className="flex flex-col flex-grow justify-around">
                        <Skeleton className="h-[10px] w-full rounded-md bg-muted-foreground" />
                        <div className="h-1"></div>
                        <Skeleton className="h-[10px] w-[400px] rounded-md bg-muted-foreground" />
                        <div className="h-1"></div>
                        <Skeleton className="h-[10px] w-[300px] rounded-md bg-muted-foreground" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentsSkeleton
