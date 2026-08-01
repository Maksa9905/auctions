import dayjs from 'dayjs';

export function formatDateTime(value?: string | null) {
  return value ? dayjs(value).format('DD.MM.YYYY HH:mm') : null;
}
