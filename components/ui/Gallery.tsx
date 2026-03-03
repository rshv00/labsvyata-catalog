"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ImageRef } from "@/content/types";

type GalleryProps = {
  images: ImageRef[];
};

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд фото"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            onClick={() => setActiveIndex(null)}
          >
            Закрити
          </button>
          <div className="relative h-[70vh] w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              sizes="100vw"
              className="rounded-2xl object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
