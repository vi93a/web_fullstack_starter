import express from "express";
import { HealthController } from "../controllers/health";

export function setupHealthRoutes(app: express.Application, healthController: HealthController) {
  app.get("/health", healthController.getHealthStatus);
}
