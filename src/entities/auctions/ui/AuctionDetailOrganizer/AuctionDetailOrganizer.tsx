import { useTranslation } from 'react-i18next';

import AuctionDetailField from '../AuctionDetailField';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailOrganizerProps } from './interface';

export default function AuctionDetailOrganizer({
  organizer,
  contacts,
  hideContacts,
}: AuctionDetailOrganizerProps) {
  const { t } = useTranslation('auctions');

  return (
    <AuctionDetailSection title={t('detail.organizer.title')}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AuctionDetailField
          label={t('detail.organizer.name')}
          value={organizer.organization_name}
        />
        <AuctionDetailField label={t('detail.organizer.inn')} value={organizer.organization_inn} />
      </div>
      {contacts.length > 0 && !hideContacts && (
        <div className="mt-4 flex flex-col gap-2 border-t border-border/80 pt-3">
          <div className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
            {t('detail.organizer.contacts')}
          </div>
          {contacts.map((contact, index) => (
            <div key={contact.uid ?? `${contact.name}-${index}`} className="text-sm">
              <span className="font-medium">{contact.name || '—'}</span>
              {contact.phone ? (
                <span className="text-muted-foreground">
                  {' · '}
                  {contact.phone}
                </span>
              ) : null}
              {contact.email ? (
                <span className="text-muted-foreground">
                  {' · '}
                  {contact.email}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </AuctionDetailSection>
  );
}
