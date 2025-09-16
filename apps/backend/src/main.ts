import http from "http";

import { startServer } from "./delivery/http/server";
import { config, ServerMode } from "./utils/config";

async function main() {
  let server: http.Server;

  try {
    switch (config.ServerMode) {
      case ServerMode.HTTP_SERVER:
        server = await startServer();
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
