import { defineConfig } from "drizzle-kit";
import { config } from "./src/utils/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/internal/repository",
  dialect: "postgresql",
  dbCredentials: {
    url: config.PostgresUrl,
  },
});
