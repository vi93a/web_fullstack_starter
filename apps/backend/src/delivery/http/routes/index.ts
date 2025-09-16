import express from "express";
import { setupHealthRoutes } from "./health";
import { HealthControllerImpl } from "../controllers/health";
import { UsecaseStore } from "src/internal/usecases";

export function setupRoutes(app: express.Application, usecaseStore: UsecaseStore) {
  setupHealthRoutes(app, new HealthControllerImpl(usecaseStore));
}
