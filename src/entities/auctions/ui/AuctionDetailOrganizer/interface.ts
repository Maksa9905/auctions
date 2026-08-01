import type { AuctionShowOrganizer, Contact } from '@/shared/api';

export interface AuctionDetailOrganizerProps {
  organizer: AuctionShowOrganizer;
  contacts: Contact[];
  hideContacts?: boolean;
}
