export function formatPriceUah(price: number): string {
  return `від ${new Intl.NumberFormat("uk-UA").format(price)} грн`;
}

export function formatPhoneHref(phone: string): string {
  const sanitized = phone.replace(/\s+/g, "");
  return `tel:${sanitized}`;
}

export function formatMinutes(minutes: number): string {
  return `${minutes} хв`;
}
