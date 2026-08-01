export function formatPrice(value?: number | null, fallback = '—') {
  if (value == null || Number.isNaN(value)) {
    return fallback;
  }

  return new Intl.NumberFormat('ru-RU').format(value);
}
