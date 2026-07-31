import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

import AuctionBetsPage from '@pages/AuctionBetsPage';
import AuctionDetailPage from '@pages/AuctionDetailPage';
import AuctionsListPage from '@pages/AuctionsListPage';

import { routes } from '@shared/routes';

const rootRoute = createRootRoute({
  component: () => (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: routes.auctions });
  },
});

const auctionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.auctions,
  component: AuctionsListPage,
});

const auctionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.auctionById('$id'),
  component: AuctionDetailPage,
});

const auctionBetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.auctionBets('$id'),
  component: AuctionBetsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  auctionsRoute,
  auctionDetailRoute,
  auctionBetsRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
