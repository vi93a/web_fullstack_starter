import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { config } from "../config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

export async function connectToPostgres(): Promise<NodePgDatabase> {
  const client = new Client({
    connectionString: config.PostgresUrl,
  });

  await client.connect();

  const db = drizzle(client);

  return db;
}
