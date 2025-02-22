import type { TRPCRouterRecord } from "@trpc/server"

import { posts } from "@acme/db/schema"

import { publicProcedure } from "../trpc"

export const postRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(posts).limit(10)
  }),
} satisfies TRPCRouterRecord
