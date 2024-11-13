// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });


import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Make sure you're using the correct environment variable
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL is not defined in environment variables');
}

// Create the SQL client
const sql = neon(databaseUrl);

// Create the database instance
export const db = drizzle(sql);


// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// // Initialize the Neon client correctly
// const sql = neon(process.env.DATABASE_URL!);

// // Initialize Drizzle ORM with the correct client format
// export const db = drizzle(sql);  // No need to wrap it in `{ client: ... }`
