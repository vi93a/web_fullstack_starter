import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDatabaseConnection } from "./database";

export const auth = betterAuth({
  database: drizzleAdapter(() => getDatabaseConnection(), {
    provider: "pg",
  }),
});
