import express from "express";
import { UsecaseStore } from "../../../../src/internal/usecases";

export interface HealthController {
  getHealthStatus(req: express.Request, res: express.Response): Promise<void>;
  getTestCv(req: express.Request, res: express.Response): Promise<void>;
}

export class HealthControllerImpl implements HealthController {
  private usecaseStore: UsecaseStore;

  constructor(usecaseStore: UsecaseStore) {
    this.usecaseStore = usecaseStore;
  }

  async getHealthStatus(_: express.Request, res: express.Response): Promise<void> {
    res.status(200).json({ status: "ok" });
  }

  async getTestCv(req: express.Request, res: express.Response): Promise<void> {
    const configVariableValue = await this.usecaseStore.configVariableUsecase.getConfigVariableValue("test");

    res.status(200).json({ value: configVariableValue });
  }
}
