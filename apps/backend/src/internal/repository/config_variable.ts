import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

export const configVariableTable = pgTable("config_variable", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
});

export type ConfigVariable = {
  id: number;
  key: string;
  value: string;
};

export interface ConfigVariableRepository {
  getConfigVariable(key: string): Promise<ConfigVariable | null>;
}

export class ConfigVariableRepositoryImpl implements ConfigVariableRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async getConfigVariable(key: string): Promise<ConfigVariable | null> {
    const configVariable = await this.db.select().from(configVariableTable).where(eq(configVariableTable.key, key));

    return configVariable[0] || null;
  }
}
