import { authMiddleware, clerkClient } from "@clerk/nextjs";
import { username } from "./lib/utils";

export default authMiddleware({
    publicRoutes: ["/"],
    afterAuth: async (auth, req, evt) => {
        if (auth.userId) {
            const user = await clerkClient.users.getUser(auth.userId)
            if (!user.username) {
                const name = username()
                await clerkClient.users.updateUser(auth.userId, { username: name })
            }
        }
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};