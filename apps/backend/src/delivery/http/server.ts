import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { handleError } from "@repo/backend_utils";

import { config } from "../../utils/config";
import { setupRoutes } from "./routes";
import { UsecaseStore } from "../../../src/internal/usecases";
import { setupAuthRoutes } from "./routes/auth";

export const startServer = async (usecaseStore: UsecaseStore): Promise<http.Server> => {
  console.log(`Starting server as ${config.ServerMode} on port ${config.ServerPort}`);

  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.urlencoded({ extended: false }));

  // setup auth routes before json parsing so that it doesn't interact with better-auth handler
  setupAuthRoutes(app);

  app.use(bodyParser.json());

  const server = app.listen(config.ServerPort, () => {
    console.log(`HTTP server started on port: ${config.ServerPort}`);
  });

  setupRoutes(app, usecaseStore);

  app.use(handleError);

  return server;
};
