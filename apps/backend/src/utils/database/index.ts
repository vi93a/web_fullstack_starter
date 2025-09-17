import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { config } from "../config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../../internal/repository/auth";

const client = new Client({
  connectionString: config.PostgresUrl,
});

export const db = drizzle(client, { schema });

export async function initializeDatabase(): Promise<void> {
  await client.connect();
}
