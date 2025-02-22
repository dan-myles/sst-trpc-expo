/// <reference types="../../../sst-env.d.ts" />
import { drizzle } from "drizzle-orm/node-postgres"
import { Resource } from "sst"

import * as schema from "./schema"
import { Pool } from "pg"

const pool = new Pool({
  host: Resource.AcmeDB.host,
  port: Resource.AcmeDB.port,
  user: Resource.AcmeDB.username,
  password: Resource.AcmeDB.password,
  database: Resource.AcmeDB.database,
})

export const db = drizzle(pool, {
  schema,
  casing: "snake_case",
})
