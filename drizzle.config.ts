import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/validators/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
