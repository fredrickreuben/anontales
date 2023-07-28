'use client'

import Feeds from '../feeds'
import React from 'react'

interface HomeFeedsProp extends React.HTMLAttributes<HTMLElement> {}

const HomeFeeds = ({}: HomeFeedsProp) => {
    return <Feeds />
}

export default HomeFeeds
