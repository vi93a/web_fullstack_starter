import { RepoStore } from "../repository";
import { ConfigVariableUsecase, ConfigVariableUsecaseImpl } from "./config_variable";

export class UsecaseStore {
  configVariableUsecase: ConfigVariableUsecase;

  constructor(repoStore: RepoStore) {
    this.configVariableUsecase = new ConfigVariableUsecaseImpl(repoStore.configVariableRepo);
  }
}
