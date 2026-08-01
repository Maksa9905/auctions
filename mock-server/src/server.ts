import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { config as loadEnv } from 'dotenv';
import jsonServer from 'json-server';

import { auctionsDb, getAuctionsStoreState, initAuctionsStore } from './db';
import { createInitialAuctions } from './fixtures';
import type { AuctionListRequest, AuctionsStoreState, SetBetRequest } from './types';

const root = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.join(root, '..');
const repoRoot = path.join(packageRoot, '..');

// Корневой .env проекта, затем локальный mock-server/.env (имеет приоритет)
loadEnv({ path: path.join(repoRoot, '.env') });
loadEnv({ path: path.join(packageRoot, '.env'), override: true });

const dbPath = path.join(packageRoot, 'db.json');

type MockDbFile = {
  auctions: AuctionsStoreState['auctions'];
  meta: { nextBetId: number };
};

type MockRequest = {
  body?: unknown;
  params: Record<string, string>;
  query: Record<string, string | undefined>;
};

type MockResponse = {
  status: (code: number) => MockResponse;
  json: (body: unknown) => void;
  end: () => void;
};

function readNumberEnv(name: string, fallback = 0) {
  const raw = process.env[name];
  if (raw == null || raw === '') {
    return fallback;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function createSeedDb(): MockDbFile {
  return {
    auctions: createInitialAuctions(),
    meta: { nextBetId: 1000 },
  };
}

function ensureDbFile() {
  const shouldReset = process.env.MOCK_RESET === 'true';

  if (shouldReset || !fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(createSeedDb(), null, 2));
    console.info(`[mock-server] seeded ${dbPath}`);
  }
}

ensureDbFile();

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({ logger: true });
const db = router.db;

const storedAuctions = db.get('auctions').value() as MockDbFile['auctions'];
const storedMeta = db.get('meta').value() as MockDbFile['meta'] | undefined;

initAuctionsStore(
  {
    auctions:
      Array.isArray(storedAuctions) && storedAuctions.length > 0
        ? storedAuctions
        : createInitialAuctions(),
    nextBetId: storedMeta?.nextBetId ?? 1000,
  },
  () => {
    const snapshot = getAuctionsStoreState();
    db.set('auctions', snapshot.auctions)
      .set('meta', { nextBetId: snapshot.nextBetId })
      .write();
  },
);

const delayMs = Math.max(0, readNumberEnv('MOCK_DELAY_MS'));
const errorRate = Math.min(1, Math.max(0, readNumberEnv('MOCK_ERROR_RATE')));
const port = Math.max(1, readNumberEnv('MOCK_PORT', 3001));

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((_req: MockRequest, res: MockResponse, next: () => void) => {
  const finish = () => {
    if (errorRate > 0 && Math.random() < errorRate) {
      res.status(503).json({
        type: 'https://httpstatuses.com/503',
        title: 'Service Unavailable',
        status: 503,
        detail: 'Mock server simulated error',
      });
      return;
    }

    next();
  };

  if (delayMs > 0) {
    setTimeout(finish, delayMs);
    return;
  }

  finish();
});

server.post('/api/v1/auctions/list', (req: MockRequest, res: MockResponse) => {
  res.json(auctionsDb.listAuctions((req.body as AuctionListRequest | undefined) ?? {}));
});

server.get('/api/v1/auctions/:auctionUuid', (req: MockRequest, res: MockResponse) => {
  const auction = auctionsDb.getAuction(req.params.auctionUuid);

  if (!auction) {
    res.status(404).json({
      type: 'https://httpstatuses.com/404',
      title: 'Not Found',
      status: 404,
      detail: `Auction ${req.params.auctionUuid} not found`,
    });
    return;
  }

  res.json(auction);
});

server.get('/api/v1/auctions/:auctionUuid/bets', (req: MockRequest, res: MockResponse) => {
  const all = req.query.all === 'true';
  const bets = auctionsDb.listBets(req.params.auctionUuid, all);

  if (!bets) {
    res.status(404).json({
      type: 'https://httpstatuses.com/404',
      title: 'Not Found',
      status: 404,
      detail: `Auction ${req.params.auctionUuid} not found`,
    });
    return;
  }

  res.json(bets);
});

server.post('/api/v1/auctions/:auctionUuid/bets', (req: MockRequest, res: MockResponse) => {
  const result = auctionsDb.setBet(
    req.params.auctionUuid,
    (req.body as SetBetRequest | undefined) ?? { price: 0 },
  );

  if (!result.ok) {
    res.status(result.status).json(result.body);
    return;
  }

  res.status(200).end();
});

server.listen(port, () => {
  console.info(`[mock-server] listening on http://localhost:${port}`);
  console.info(`[mock-server] delay=${delayMs}ms errorRate=${errorRate}`);
});
