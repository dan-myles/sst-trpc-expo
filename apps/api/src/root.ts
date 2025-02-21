import { postRouter } from "./routers/post.router"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  post: postRouter,
})

// Export type definition of API
export type AppRouter = typeof appRouter
