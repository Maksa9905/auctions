# Auctions

[![CI](https://github.com/Maksa9905/auctions/actions/workflows/ci.yml/badge.svg)](https://github.com/Maksa9905/auctions/actions/workflows/ci.yml)

Фронтенд списка и деталки аукционов (React + Vite + TypeScript) с локальным mock API.

## Быстрый старт

Нужны **Node.js 20+** и **pnpm**.

```bash
pnpm install
cp .env.example .env
pnpm dev:mock
```

Открой [http://localhost:5173](http://localhost:5173).  
Vite проксирует `/api` → mock-server на порту `MOCK_PORT` (по умолчанию `3001`).

### Docker

```bash
cp .env.example .env
docker compose up --build
```

UI: [http://localhost:8080](http://localhost:8080)  
Mock API: [http://localhost:3001](http://localhost:3001)

## Полезные команды

| Команда | Описание |
| --- | --- |
| `pnpm dev:mock` | frontend + mock-server |
| `pnpm mock` | только mock-server |
| `pnpm mock:reset` | mock-server с сбросом `db.json` |
| `pnpm test` / `pnpm test:run` | тесты (watch / once) |
| `pnpm lint` | ESLint |
| `pnpm build` | production-сборка |

## Env

См. [`.env.example`](.env.example):

- `VITE_API_BASE_URL` — база API на фронте (`/api/v1`)
- `MOCK_PORT` — порт mock-server
- `MOCK_DELAY_MS` — искусственная задержка ответов
- `MOCK_ERROR_RATE` — доля случайных ошибок (`0`–`1`)
