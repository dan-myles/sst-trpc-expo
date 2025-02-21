import { QueryClient } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import superjson from "superjson"

import type { AppRouter } from "@acme/api"

import { getBaseUrl } from "./base-url"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ...
    },
  },
})

/**
 * A set of typesafe hooks for consuming your API.
 */
const api = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
        colorMode: "ansi",
      }),
      httpBatchLink({
        transformer: superjson,
        url: `${getBaseUrl()}/api/trpc`,
        headers() {
          const headers = new Map<string, string>()
          headers.set("x-trpc-source", "expo-react")

          // TODO: Set token here?

          return Object.fromEntries(headers)
        },
      }),
    ],
  }),
  queryClient,
})

export { type RouterInputs, type RouterOutputs } from "@acme/api"
export { api, queryClient }
