import "dotenv/config";

export enum ServerMode {
  HTTP_SERVER = "http_server",
  WORKER = "worker",
}

export type Config = {
  ServerMode: ServerMode;
  ServerPort: number;
  PostgresUrl: string;
  BetterAuthTrustedOrigins?: string;
};

export const config: Config = {
  ServerMode: (process.env.SERVER_MODE as ServerMode) || ServerMode.HTTP_SERVER,
  ServerPort: parseInt(process.env.SERVER_PORT as string) || 3000,
  PostgresUrl: process.env.DATABASE_URL || "postgresql://dev:pass@localhost:5432/app",
  BetterAuthTrustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS,
};
