import { pgTable, boolean, serial, varchar, json } from "drizzle-orm/pg-core"


export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	email: varchar('email').notNull(),
	image: varchar('image').notNull(),
	subscrption: boolean('subscrption').notNull().default(false),
})

export const videoData = pgTable('videoData', {
	id: serial('id').primaryKey(),
	script: json('videoScript').notNull(),
	audioFileUrl: varchar('audioFileUrl').notNull(),
	captions: varchar('captions').notNull(),
	imageList: varchar('imageList').array(),
	createdby: varchar('createdby').notNull(),
})
