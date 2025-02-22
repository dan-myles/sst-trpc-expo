import type { TRPCRouterRecord } from "@trpc/server"

import { publicProcedure } from "../trpc"

export const postRouter = {
  all: publicProcedure.query(() => {
    return "Hello World!"
  }),
} satisfies TRPCRouterRecord
