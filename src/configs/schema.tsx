import { pgTable, boolean, serial, varchar, json, integer, timestamp } from "drizzle-orm/pg-core"

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
	credits: integer('credits').default(20)  // 20 credits will be 4 videos
})


export const videoData = pgTable('videoData', {
	id: serial('id').primaryKey(),
	videoScript: json('videoScript').notNull(),  // Changed from 'script'
	audioFileUrl: varchar('audioFileUrl').notNull(),
	captions: json('captions').notNull(),
	imageList: varchar('imageList').array(),  // Changed from 'imagesList'
	createdby: varchar('createdby').notNull(),
});

// TypeScript type for the data structure
export type VideoDataType = typeof videoData.$inferInsert;
