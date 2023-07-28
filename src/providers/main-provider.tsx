import { ClerkProvider } from '@clerk/nextjs'
import StoreProvider from './store-provider'
import React from 'react'

const MainProvider = ({ children, ...pageProps }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    helpPageUrl: 'https://clerk.com/support',
                    logoPlacement: 'inside',
                    privacyPageUrl: 'https://clerk.com/privacy',
                    showOptionalFields: true,
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                    termsPageUrl: 'https://clerk.com/terms',
                },
            }}
            {...pageProps}
        >
            <StoreProvider>{children}</StoreProvider>
        </ClerkProvider>
    )
}

export default MainProvider
