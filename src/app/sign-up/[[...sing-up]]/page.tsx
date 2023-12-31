import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'
import { buttonVariants } from '@anontales/components/ui/button'
import { cn } from '@anontales/lib/utils'
import React from 'react'
import AuthSkeleton from '@anontales/components/skeleton/auth'

const SignUpPage = () => {
    return (
        <div className="flex justify-center py-10">
            <ClerkLoading>
                <AuthSkeleton/>
            </ClerkLoading>
            <ClerkLoaded>
                <SignUp
                    appearance={{
                        elements: {
                            card: 'shadow-md bg-secondary',
                            headerTitle: 'text-2xl font-semibold tracking-tight text-foreground',
                            headerSubtitle: 'text-sm text-muted-foreground',
                            socialButtonsBlockButton: cn(buttonVariants({ variant: 'outline' }), 'text-foreground hover:opacity-50 transition-all'),
                            formButtonPrimary: cn(buttonVariants()),
                            dividerLine: 'bg-foreground',
                            dividerText: 'text-foreground uppercase',
                            formFieldLabel: cn('text-sm text-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'),
                            formFieldInput: cn(
                                'flex h-10 mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-foreground text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                            ),
                            footerActionText: 'text-foreground',
                        },
                    }}
                    path="/sign-up"
                    routing="path"
                    signInUrl="/sign-in"
                    redirectUrl="/protectedPage"
                />
            </ClerkLoaded>
        </div>
    )
}

export default SignUpPage
