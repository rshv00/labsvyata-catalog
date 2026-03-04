"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, site } from "@/content/site";
import { instagramLogoSrc } from "@/lib/instagram";
import { Container } from "./Container";

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "");
}

function isActivePath(current: string, href: string): boolean {
  const normalizedCurrent = normalizePath(current);
  const normalizedHref = normalizePath(href);

  if (normalizedHref === "/") {
    return normalizedCurrent === "/";
  }

  return normalizedCurrent === normalizedHref || normalizedCurrent.startsWith(`${normalizedHref}/`);
}

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", onKeyDown);
      };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const updateMenuTop = () => {
      const top = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      setMenuTop(top);
    };

    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    window.addEventListener("scroll", updateMenuTop, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMenuTop);
      window.removeEventListener("scroll", updateMenuTop);
    };
  }, [isMobileMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <Container className="py-2.5 md:py-3">
        <div className="flex items-center justify-between gap-3">
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

          <button
            type="button"
            aria-label="Відкрити меню"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-200 bg-white text-brand-800 shadow-soft transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 md:hidden"
          >
            <span
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
        </div>

        <nav aria-label="Головна навігація" className="mt-3 hidden md:block">
          <ul className="flex gap-2 text-sm font-medium lg:flex-wrap">
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

      {isMobileMenuOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-brand-50/95 backdrop-blur md:hidden" style={{ top: `${menuTop}px` }}>
          <nav aria-label="Мобільна навігація" className="h-full overflow-y-auto px-4 py-5">
            <ul className="space-y-2">
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={`mobile-${item.href}`}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-base font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                          active ? "bg-brand-600 text-white" : "text-slate-900 hover:bg-white"
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
        </div>
      ) : null}
    </header>
  );
}
