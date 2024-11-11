// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });



import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Initialize the Neon client correctly
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle ORM with the correct client format
export const db = drizzle(sql);  // No need to wrap it in `{ client: ... }`

