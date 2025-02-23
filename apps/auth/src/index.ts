import { Hono } from "hono"
import { handle } from "hono/aws-lambda"

import { auth } from "./auth"

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}>()

app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw))

const handler = handle(app)
export { handler, auth }
