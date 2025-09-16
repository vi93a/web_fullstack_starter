import express from "express";
import { setupHealthRoutes } from "./health";
import { HealthControllerImpl } from "../controllers/health";

export function setupRoutes(app: express.Application) {
  setupHealthRoutes(app, new HealthControllerImpl());
}
