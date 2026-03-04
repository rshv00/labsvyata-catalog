import { site } from "@/content/site";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function toE164Phone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10 && digits.startsWith("0")) {
    return `+38${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("380")) {
    return `+${digits}`;
  }

  return `+${digits}`;
}

function toSchemaOpeningHours(workingHoursUa: string): string | undefined {
  const timeMatch = workingHoursUa.match(/(\d{2}:\d{2})\s*[-–]\s*(\d{2}:\d{2})/);
  const isDaily = /щодня/i.test(workingHoursUa);

  if (!timeMatch || !isDaily) {
    return undefined;
  }

  return `Mo-Su ${timeMatch[1]}-${timeMatch[2]}`;
}

export const siteBaseUrl = stripTrailingSlash(site.site_url);

export function getCanonicalUrl(path: string): string {
  return `${siteBaseUrl}${normalizePath(path)}`;
}

export function getLocalBusinessJsonLd(): Record<string, unknown> {
  const streetAddress = site.address_street_ua || site.address_lines_ua?.[1];
  const openingHours = toSchemaOpeningHours(site.working_hours_ua);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brand_name_ua,
    url: getCanonicalUrl("/"),
    telephone: site.phones.map(toE164Phone),
    areaServed: site.service_area_ua,
    sameAs: [site.telegram_url, site.instagram_url].filter(Boolean),
  };

  if (streetAddress) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Боярка",
      addressCountry: "UA",
    };
  }

  if (openingHours) {
    jsonLd.openingHours = [openingHours];
  }

  return jsonLd;
}
