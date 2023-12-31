import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {clerkClient, User} from "@clerk/nextjs/server";

const filterUserForClient = (user: User) => {
    return {id: user.id, username: user.username, profilePicture: user.imageUrl}
}

export const postRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({text: z.string()}))
        .query(({input}) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAllPosts: publicProcedure.query(async ({ctx}) => {
            const posts = await ctx.db.post.findMany({take: 100})
            const users = (await clerkClient.users.getUserList({
                userId: posts.map((post) => post.authorId),
                limit: 100
            })).map(filterUserForClient)

        return posts.map((post) => ({post, author: users.find((user) => user.id === post.authorId)}))

        }
    )
});
