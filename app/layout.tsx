import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuickActions } from "@/components/layout/MobileQuickActions";

const exo = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${site.brand_name_ua} | Дитячі свята у ${site.city_ua}`,
    template: `%s | ${site.brand_name_ua}`,
  },
  icons: {
    icon: [{ url: "/images/instagram/logo.jpg", type: "image/jpeg" }],
    shortcut: ["/images/instagram/logo.jpg"],
    apple: [{ url: "/images/instagram/logo.jpg", type: "image/jpeg" }],
  },
  description: site.seo_description_ua,
  openGraph: {
    title: `${site.brand_name_ua} | Дитячі свята`,
    description: site.seo_description_ua,
    locale: "uk_UA",
    type: "website",
  },
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
