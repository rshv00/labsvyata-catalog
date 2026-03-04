import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuickActions } from "@/components/layout/MobileQuickActions";
import { getCanonicalUrl } from "@/lib/seo";

const exo = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.site_url),
  title: {
    default: "Лабораторія свята — дитячі свята в Боярці",
    template: "%s | Лабораторія свята — свята в Боярці",
  },
  description: "Організація дитячих свят у Боярці: аніматори, програми, ціни, свята в приміщенні та на виїзд.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Лабораторія свята — дитячі свята в Боярці",
    description: "Організація дитячих свят у Боярці: аніматори, програми, ціни, свята в приміщенні та на виїзд.",
    url: getCanonicalUrl("/"),
    siteName: site.brand_name_ua,
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Лабораторія свята — дитячі свята в Боярці",
    description: "Організація дитячих свят у Боярці: аніматори, програми, ціни, свята в приміщенні та на виїзд.",
  },
  verification: site.google_site_verification ? { google: site.google_site_verification } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={exo.variable}>
      <body className="font-[var(--font-exo)] antialiased">
        <Header />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileQuickActions />
      </body>
    </html>
  );
}
