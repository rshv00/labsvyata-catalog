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
  default_character_slugs?: string[];
  duration_minutes: number;
  price_uah_from: number;
  tags_ua: string[];
  included_ua: string[];
  pricing_tiers?: ProgramPricingTier[];
  pricing_notes_ua?: string[];
  hero_image: ImageRef;
  images: ImageRef[];
  is_featured?: boolean;
};

export type ProgramPricingTier = {
  label_ua: string;
  price_uah: number;
  note_ua?: string;
};

export type Package = {
  slug: string;
  name_ua: string;
  duration_minutes: number;
  includes_ua: string[];
  price_uah_from: number;
  recommended_for_ua?: string;
  timing_ua?: string;
};

export type PackageGroup = {
  slug: string;
  category_ua: string;
  rule_ua: string;
  notes_ua?: string[];
  packages: Package[];
};

export type Addon = {
  slug: string;
  name_ua: string;
  description_ua: string;
  price_uah_from: number;
  tags_ua: string[];
  notes_ua?: string[];
};

export type Pricing = { packages: Package[]; package_groups?: PackageGroup[]; addons: Addon[] };
