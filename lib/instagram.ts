import type { ImageRef } from "@/content/types";

const PLACEHOLDER_SRC = "/images/placeholder.jpg";

export const instagramLogoSrc = "/images/instagram/logo.jpg";

export const instagramPhotoSources = [
  "/images/instagram/photo-01.jpg",
  "/images/instagram/photo-02.jpg",
  "/images/instagram/photo-03.jpg",
  "/images/instagram/photo-04.jpg",
  "/images/instagram/photo-05.jpg",
  "/images/instagram/photo-06.jpg",
  "/images/instagram/photo-07.jpg",
  "/images/instagram/photo-08.jpg",
  "/images/instagram/photo-09.jpg",
  "/images/instagram/photo-10.jpg",
  "/images/instagram/photo-11.jpg",
  "/images/instagram/photo-12.jpg",
];

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function resolveCatalogImage(src: string, key: string, offset = 0): string {
  if (src !== PLACEHOLDER_SRC) {
    return src;
  }

  const base = hashString(key);
  const index = (base + offset) % instagramPhotoSources.length;
  return instagramPhotoSources[index];
}

export function resolveCatalogImages(images: ImageRef[], key: string): ImageRef[] {
  return images.map((image, index) => ({
    ...image,
    src: resolveCatalogImage(image.src, key, index + 1),
  }));
}

