import ToggleTheme from '@anontales/components/helpers/toggle-theme'
import { Icons } from '@anontales/components/helpers/icons'
import { siteConfig } from '@anontales/config/site'
import { cn } from '@anontales/lib/utils'
import React from 'react'

const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <footer className={cn(className, 'relative')}>
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:py-3">
                <div className="flex flex-col items-center justify-center gap-4 px-8 md:gap-2 md:px-0">
                    <Icons.logo />
                    <div>
                        <span className="text-center text-sm leading-loose md:text-left py-2">Share Your Stories Anonymously. Empower. Inspire. Connect.</span>
                    </div>
                    <p className="text-center text-sm leading-loose md:text-left pb-4">
                        Built by{' '}
                        <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                            Fredrick Reuben
                        </a>
                    </p>
                </div>
            </div>
            <ToggleTheme />
        </footer>
    )
}

export default Footer
