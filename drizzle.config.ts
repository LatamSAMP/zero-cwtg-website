import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./app/database/schemas.ts",
  out: "./drizzle",
});
