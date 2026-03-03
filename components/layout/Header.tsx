"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, site } from "@/content/site";
import { instagramLogoSrc } from "@/lib/instagram";
import { Container } from "./Container";

function isActivePath(current: string, href: string): boolean {
  if (href === "/") return current === "/";
  return current.startsWith(href);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <Container className="flex flex-col gap-3 py-2.5 md:py-3 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-black text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Image
            src={instagramLogoSrc}
            alt="Логотип Лабораторія свята"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-brand-200 object-cover"
          />
          <span>{site.brand_name_ua}</span>
        </Link>
        <nav aria-label="Головна навігація">
          <ul className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1 text-sm font-medium [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-3 md:flex-wrap md:overflow-visible md:whitespace-normal md:pb-0">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      active ? "bg-brand-600 text-white" : "text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
