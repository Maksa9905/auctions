FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

# Generated OpenAPI models used by fixtures/db types
COPY src/shared/api/generated ./src/shared/api/generated
COPY mock-server/package.json mock-server/tsconfig.json ./mock-server/
COPY mock-server/data ./mock-server/data
COPY mock-server/src ./mock-server/src

WORKDIR /app/mock-server
RUN pnpm install

ENV MOCK_PORT=3001
EXPOSE 3001

CMD ["pnpm", "start"]
