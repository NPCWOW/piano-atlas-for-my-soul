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
    portrait:
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Sergei_Rachmaninoff_cph.3a40575.jpg",
    biography: {
      ru: "Композитор, пианист и дирижёр, соединивший позднеромантическую выразительность с исключительным чувством формы и фортепианной фактуры.",
      en: "A composer, pianist and conductor who joined late-Romantic expression with an exceptional command of form and piano texture.",
    },
  },
  {
    id: "wolfgang-amadeus-mozart",
    slug: "wolfgang-amadeus-mozart",
    name: { ru: "Вольфганг Амадей Моцарт", en: "Wolfgang Amadeus Mozart" },
    fullName: {
      ru: "Вольфганг Амадей Моцарт",
      en: "Wolfgang Amadeus Mozart",
    },
    born: "1756",
    died: "1791",
    country: { ru: "Австрия", en: "Austria" },
    era: "classical",
    portrait:
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Barbara_Krafft_-_Portr%C3%A4t_Wolfgang_Amadeus_Mozart_%281819%29.jpg",
    biography: {
      ru: "Австрийский композитор и пианист венской классической школы, чья музыка соединяет прозрачность формы, театральность, мелодическую свободу и редкую эмоциональную глубину.",
      en: "An Austrian composer and pianist of the Viennese Classical school whose music unites formal clarity, theatrical instinct, melodic freedom and unusual emotional depth.",
    },
  },
];

export function getComposerById(id: string) {
  return composers.find((composer) => composer.id === id);
}

export function getComposerBySlug(slug: string) {
  return composers.find((composer) => composer.slug === slug);
}
