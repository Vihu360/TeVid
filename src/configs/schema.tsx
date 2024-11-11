import { pgTable, boolean, serial, varchar, json, timestamp } from "drizzle-orm/pg-core"

export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('name').notNull(),
	lastName: varchar('lastname').notNull(),
	email: varchar('email').notNull(),
	password: varchar('password').notNull(),
	isVerified: boolean('isVerified').notNull().default(false),
	refreshToken: varchar('refreshToken'),
	verifyCode: varchar('verifyCode'),
	verifyCodeExpires: timestamp('verifyCodeExpires'),
	subs: varchar('subs').notNull().default('free'),
})

export const videoData = pgTable('videoData', {
	id: serial('id').primaryKey(),
	script: json('videoScript').notNull(),
	audioFileUrl: varchar('audioFileUrl').notNull(),
	captions: varchar('captions').notNull(),
	imageList: varchar('imageList').array(),
	createdby: varchar('createdby').notNull(),
})
