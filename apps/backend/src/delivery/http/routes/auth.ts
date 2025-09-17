import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "../../../utils/auth";

export function setupAuthRoutes(app: express.Application) {
  app.all("/api/auth/{*any}", toNodeHandler(auth));
}
