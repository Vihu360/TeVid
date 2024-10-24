import { pgTable, boolean, serial, varchar } from "drizzle-orm/pg-core"


export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	email: varchar('email').notNull(),
	image: varchar('image').notNull(),
	subscrption: boolean('subscrption').notNull().default(false),
})
