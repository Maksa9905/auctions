import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { routes } from '@shared/routes';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
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
  component: lazyRouteComponent(() => import('@pages/AuctionsListPage')),
});

const auctionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.auctionById,
  component: lazyRouteComponent(() => import('@pages/AuctionDetailPage')),
});

const routeTree = rootRoute.addChildren([indexRoute, auctionsRoute, auctionDetailRoute]);

export const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
