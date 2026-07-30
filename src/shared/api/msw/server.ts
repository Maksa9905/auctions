import { setupServer } from 'msw/node';

import { auctionsHandlers } from './handlers';

export const server = setupServer(...auctionsHandlers);
