export type ImageRef = { src: string; alt: string };

export type Character = {
  slug: string;
  name_ua: string;
  short_ua: string;
  description_ua: string;
  age_range_ua: string;
  duration_options_minutes: number[];
  base_price_uah_from: number;
  tags_ua: string[];
  hero_image: ImageRef;
  images: ImageRef[];
  is_featured?: boolean;
};

export type Program = {
  slug: string;
  name_ua: string;
  short_ua: string;
  description_ua: string;
  recommended_ages_ua: string;
  duration_minutes: number;
  price_uah_from: number;
  tags_ua: string[];
  included_ua: string[];
  hero_image: ImageRef;
  images: ImageRef[];
  is_featured?: boolean;
};

export type Package = {
  slug: string;
  name_ua: string;
  duration_minutes: number;
  includes_ua: string[];
  price_uah_from: number;
  recommended_for_ua?: string;
};

export type Addon = {
  slug: string;
  name_ua: string;
  description_ua: string;
  price_uah_from: number;
  tags_ua: string[];
};

export type Pricing = { packages: Package[]; addons: Addon[] };
