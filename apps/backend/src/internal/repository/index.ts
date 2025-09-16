import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ConfigVariableRepository, ConfigVariableRepositoryImpl } from "./config_variable";

export class RepoStore {
  configVariableRepo: ConfigVariableRepository;

  constructor(db: NodePgDatabase) {
    this.configVariableRepo = new ConfigVariableRepositoryImpl(db);
  }
}
