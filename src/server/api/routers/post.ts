import {z} from "zod";

import {createTRPCRouter, privateProcedure, publicProcedure} from "~/server/api/trpc";
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
            const posts = await ctx.db.post.findMany({
                take: 100,
                orderBy: [{
                    createdAt: "desc"
                }]
            })
            const users = (await clerkClient.users.getUserList({
                userId: posts.map((post) => post.authorId),
                limit: 100,
            })).map(filterUserForClient)

            return posts.map((post) => ({post, author: users.find((user) => user.id === post.authorId)}))

        }
    ),

    createPost: privateProcedure.input(
        z.object({
            content: z.string().emoji().min(1).max(200),
        })).mutation(async ({ctx, input}) => {
        const authorId = ctx.userId
        return await ctx.db.post.create({
            data: {
                content: input.content,
                authorId,
            }
        })

    })
});
