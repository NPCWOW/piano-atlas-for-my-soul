import type { Composer } from "@/types/music";

export const composers: Composer[] = [
  {
    id: "sergei-rachmaninoff",
    slug: "sergei-rachmaninoff",
    name: { ru: "Сергей Рахманинов", en: "Sergei Rachmaninoff" },
    fullName: {
      ru: "Сергей Васильевич Рахманинов",
      en: "Sergei Vasilievich Rachmaninoff",
    },
    born: "1873",
    died: "1943",
    country: { ru: "Россия", en: "Russia" },
    era: "romantic",
    biography: {
      ru: "Композитор, пианист и дирижёр, соединивший позднеромантическую выразительность с исключительным чувством формы и фортепианной фактуры.",
      en: "A composer, pianist and conductor who joined late-Romantic expression with an exceptional command of form and piano texture.",
    },
  },
];

export function getComposerById(id: string) {
  return composers.find((composer) => composer.id === id);
}

export function getComposerBySlug(slug: string) {
  return composers.find((composer) => composer.slug === slug);
}
