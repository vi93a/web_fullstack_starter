import httpErrors from "http-errors";
import { ConfigVariableRepository } from "../repository/config_variable";

export interface ConfigVariableUsecase {
  getConfigVariableValue(key: string): Promise<string>;
}

export class ConfigVariableUsecaseImpl implements ConfigVariableUsecase {
  constructor(private readonly configRepository: ConfigVariableRepository) {}

  async getConfigVariableValue(key: string): Promise<string> {
    const config = await this.configRepository.getConfigVariable(key);
    if (!config) {
      throw new httpErrors.NotFound(`Config variable ${key} not found`);
    }
    return config.value;
  }
}
