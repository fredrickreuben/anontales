import Image from 'next/image'
import React from 'react'

interface ErrorProp extends React.HTMLAttributes<HTMLElement> {
    title?: string
    description: string
    icon?: string
}

const Error = ({ title, description, icon }: ErrorProp) => {
    return (
        <div className="justify-center py-5 px-2">
            {icon && <Image className="h-8 w-8 m-2" src={icon} alt={title ?? ''} />}
            {title && <h1 className="text-foreground p-2 text-center">{title}</h1>}
            {description && <p className="text-muted-foreground p-2 text-center">{description}</p>}
        </div>
    )
}

export default Error
