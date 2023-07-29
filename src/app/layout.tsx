import ThemeProvider from '@anontales/providers/theme-provider'
import MainProvider from '@anontales/providers/main-provider'
import { Quicksand as FontSans } from 'next/font/google'
import { siteConfig } from '@anontales/config/site'
import { cn } from '@anontales/lib/utils'
import '../assets/styles/globals.css'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

interface RootLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI', 'Firebase'],
    authors: [
        {
            name: 'Fredrick Reuben',
            url: 'https://twitter.com/_fredreuben',
        },
    ],
    creator: 'fredrick reuben',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og.jpg`],
        creator: 'https://twitter.com/_fredreuben',
    },
    icons: {
        icon: '/icons/favicon.ico?v=4',
        shortcut: '/icons/apple-touch-icon.png',
        apple: '/icons/apple-touch-icon.png?v=4',
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en" suppressHydrationWarning className='scroll-smooth'>
            <head />
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <MainProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        {children}
                    </ThemeProvider>
                </MainProvider>
            </body>
        </html>
    )
}

export default RootLayout
