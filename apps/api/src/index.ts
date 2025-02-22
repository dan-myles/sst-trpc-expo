import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda"
import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2 } from "aws-lambda"

import type { AppRouter } from "./root"
import { appRouter } from "./root"
import { createCallerFactory, createTRPCContext } from "./trpc"

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCaller = createCallerFactory(appRouter)

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>

/**
 * This is the primary function that trpc uses to start a tRPC API
 * server. It's the "glue" between your express app and your tRPC API.
 * It's main use case is for AWS Lambda and you will have to check the
 * docs for the adapter you use.
 **/
const lambda = awsLambdaRequestHandler({
  router: appRouter,
  createContext: createTRPCContext,
})

const handler: APIGatewayProxyEvent | APIGatewayProxyHandlerV2 = async (event, context) => {
  if (event.rawPath.startsWith("/api/v1/trpc")) {
    event.rawPath = event.rawPath.slice("/api/v1/trpc".length)
    if (event.rawPath === "") {
      event.rawPath = "/"
    }
  }

  if (event.requestContext.http.path) {
    event.requestContext.http.path = event.rawPath
  }

  return lambda(event, context)
}

export { createTRPCContext, appRouter, createCaller, handler }
export type { AppRouter, RouterInputs, RouterOutputs }
