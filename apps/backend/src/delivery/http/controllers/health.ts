import express from "express";

export interface HealthController {
  getHealthStatus(req: express.Request, res: express.Response): Promise<void>;
}

export class HealthControllerImpl implements HealthController {
  async getHealthStatus(_: express.Request, res: express.Response): Promise<void> {
    res.status(200).json({ status: "ok" });
  }
}
