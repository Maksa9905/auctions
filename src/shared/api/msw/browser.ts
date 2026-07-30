import { setupWorker } from 'msw/browser';

import { auctionsHandlers } from './handlers';

export const worker = setupWorker(...auctionsHandlers);

export async function startMockWorker() {
  await worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true,
  });
}
