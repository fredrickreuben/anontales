import CreateFeedEditor from '@anontales/components/feeds/create-editor'
import FeedComment from '@anontales/components/feeds/comments'
import HomeFeeds from '@anontales/components/home'
import { SignedIn } from '@clerk/nextjs'

const Home = () => {
    return (
        <div className="py-8">
            <div className="p-2">
                <SignedIn>
                    <CreateFeedEditor />
                </SignedIn>
                <HomeFeeds />
            </div>
        </div>
    )
}

export default Home
