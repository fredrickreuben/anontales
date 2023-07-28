import { SignInButton, SignOutButton, SignedIn, SignedOut, UserProfile } from '@clerk/nextjs'
import { buttonVariants } from '@anontales/components/ui/button'
import MainNav from '@anontales/components/helpers/main-nav'
import { navConfig } from '@anontales/config/nav'
import { cn } from '@anontales/lib/utils'
import React from 'react'

const Header = () => {
    return (
        <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={navConfig.mainNav} />
                <nav>
                    <SignedIn>
                        <SignOutButton>
                            <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'px-4')}>Logout</button>
                        </SignOutButton>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <button className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}>Login</button>
                        </SignInButton>
                    </SignedOut>
                </nav>
            </div>
        </header>
    )
}

export default Header
