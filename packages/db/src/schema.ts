import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
})
