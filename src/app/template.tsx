'use client'

import Header from '@anontales/partials/header'
import Footer from '@anontales/partials/footer'
import React from 'react'

const MainTemplate = ({ children }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <>
            <Header />
            <main className="container relative min-h-screen">
                <div className="max-w-2xl mx-auto">{children}</div>
            </main>
            <Footer />
        </>
    )
}

export default MainTemplate
