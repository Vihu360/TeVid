import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: "./drizzle",
  schema: "./src/configs/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:KM9DcP4bQsgn@ep-nameless-cherry-a59uo08s.us-east-2.aws.neon.tech/shorts-generator?sslmode=require",
  },
});
