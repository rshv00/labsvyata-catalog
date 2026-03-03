export function formatPriceUah(price: number): string {
  return `від ${new Intl.NumberFormat("uk-UA").format(price)} грн`;
}

export function formatPhoneHref(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length === 10 && digitsOnly.startsWith("0")) {
    return `tel:+38${digitsOnly}`;
  }
  return `tel:${digitsOnly}`;
}

export function formatMinutes(minutes: number): string {
  return `${minutes} хв`;
}
