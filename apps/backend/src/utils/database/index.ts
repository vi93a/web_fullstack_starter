import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { config } from "../config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

let db: NodePgDatabase;

export async function getDatabaseConnection(): Promise<NodePgDatabase> {
  if (db) return db;

  const client = new Client({
    connectionString: config.PostgresUrl,
  });

  await client.connect();

  db = drizzle(client);

  return db;
}
