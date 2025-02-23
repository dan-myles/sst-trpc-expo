import type { TRPCRouterRecord } from "@trpc/server"

import { post } from "@acme/db/schema"

import { publicProcedure } from "../trpc"

export const postRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(post).limit(10)
  }),
} satisfies TRPCRouterRecord
