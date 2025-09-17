# Starter template for web fullstack development

## Development steps

- Run `pnpm dev:packages` to see live changes in packages in apps, before starting apps
- Run `pnpm dev:server` to run the backend server
- Run `pnpm dev:frontend` to run the frontend server

## Production build and Run

- Build all the packages before building backend or frontend by running `pnpm build:packages`
- Backend
  - Build: `pnpm build:server`
  - Run: `pnpm start:server`
- frontend
  - Build: `pnpm build:frontend`
  - Run: `pnpm start:frontend`

## Migration generation and apply

Go to backend folder and run these commands:
- Generate migration: `pnpm migrate:generate`
- Apply migration: `pnpm migrate:apply`
