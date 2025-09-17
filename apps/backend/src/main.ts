import http from "http";

import { startServer } from "./delivery/http/server";
import { config, ServerMode } from "./utils/config";
import { getDatabaseConnection } from "./utils/database";
import { RepoStore } from "./internal/repository";
import { UsecaseStore } from "./internal/usecases";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

async function main() {
  let db: NodePgDatabase;

  try {
    db = await getDatabaseConnection();
  } catch (err) {
    console.error("Failed to connect to database:", err);
    return process.exit(1);
  }

  const repoStore = new RepoStore(db);
  const usecaseStore = new UsecaseStore(repoStore);

  let server: http.Server;

  try {
    switch (config.ServerMode) {
      case ServerMode.HTTP_SERVER:
        server = await startServer(usecaseStore);
        break;
      default:
        throw new Error(`Unknown server mode: ${config.ServerMode}`);
    }
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });

  // graceful shutdown handling
  process.on("SIGINT", () => {
    console.log("Received SIGINT signal. Exiting...");
    handleGracefulShutdown(server);
  });

  process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal. Exiting...");
    handleGracefulShutdown(server);
  });
}

function handleGracefulShutdown(server: http.Server) {
  server.close(async () => {
    console.log("Successfully closed all http connections");
  });
}

main();
