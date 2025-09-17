import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";
import * as authSchema from "../internal/repository/auth";
import { config } from "./config";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  ...(config.BetterAuthTrustedOrigins && {
    trustedOrigins: config.BetterAuthTrustedOrigins.split(","),
  }),
});
