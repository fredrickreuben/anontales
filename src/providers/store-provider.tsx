'use client'

import store from '@anontales/domain/store'
import { Provider } from 'react-redux'
import React from 'react'

const StoreProvider = ({ children, ...pageProps }: React.HTMLAttributes<HTMLElement>) => {
    return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
