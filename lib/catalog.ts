import type { Character, Program } from "@/content/types";

export function getFeaturedCharacters(items: Character[], limit = 4): Character[] {
  return items.filter((item) => item.is_featured).slice(0, limit);
}

export function getFeaturedPrograms(items: Program[], limit = 4): Program[] {
  return items.filter((item) => item.is_featured).slice(0, limit);
}

export function getRelatedCharactersByTags(items: Character[], current: Character, limit = 3): Character[] {
  return items
    .filter((item) => item.slug !== current.slug)
    .map((item) => ({
      item,
      score: item.tags_ua.filter((tag) => current.tags_ua.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function getRelatedProgramsByTags(items: Program[], current: Program, limit = 3): Program[] {
  return items
    .filter((item) => item.slug !== current.slug)
    .map((item) => ({
      item,
      score: item.tags_ua.filter((tag) => current.tags_ua.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "uk"));
}

export function uniqueNumbers(values: number[]): number[] {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}
