import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

