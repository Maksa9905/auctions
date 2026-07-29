export const routes = {
  auctions: '/auctions' as const,
  auctionById: (auctionId: string) => `/auctions/${auctionId}` as const,
  auctionBets: (auctionId: string) => `/auctions/${auctionId}/bets` as const
}