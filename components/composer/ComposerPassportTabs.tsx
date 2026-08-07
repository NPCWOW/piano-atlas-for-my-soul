"use client";

import Link from "next/link";
import { useState } from "react";
import type { Composer, Work } from "@/types/music";

type TabKey = "biography" | "works" | "timeline" | "influence" | "quotes" | "places";

type Props = {
  composer: Composer;
  works: Work[];
  hasJourney: boolean;
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "biography", label: "Биография" },
  { key: "works", label: "Произведения" },
  { key: "timeline", label: "Хронология" },
  { key: "influence", label: "Влияние" },
  { key: "quotes", label: "Цитаты" },
  { key: "places", label: "Места" },
];

const profiles = {
  "sergei-rachmaninoff": {
    headline: "Последний великий романтик и один из крупнейших пианистов своей эпохи.",
    overview: "В музыке Рахманинова соединяются широкая певучая мелодия, колокольность, сложная фортепианная фактура и исключительное чувство большого драматического дыхания.",
    traits: ["певучесть", "колокольность", "монументальность", "ностальгия", "виртуозность", "широкая форма"],
    quote: "«Музыка должна идти от сердца и быть обращена к сердцу».",
    influence: "Русская вокальная интонация, церковная колокольность, Чайковский, московская фортепианная школа и опыт великого концертирующего пианиста.",
    places: ["Семёново и Онег", "Москва", "Ивановка", "Дрезден", "Нью-Йорк", "Беверли-Хиллз"],
    journeyBackground: "/images/journey/rachmaninoff-childhood.webp",
  },
  "wolfgang-amadeus-mozart": {
    headline: "Ребёнок-виртуоз, который стал одним из главных драматургов венского классицизма.",
    overview: "Моцарт соединяет прозрачную форму с театральностью, живой музыкальной речью, внезапными эмоциональными поворотами и исключительным мелодическим даром.",
    traits: ["ясность", "театр", "певучесть", "контраст", "изящество", "ритмическая энергия"],
    quote: "«Мелодия — сущность музыки».",
    influence: "Итальянская опера, Иоганн Кристиан Бах, Гайдн, путешествия по Европе и постоянная работа с театром сформировали его универсальный музыкальный язык.",
    places: ["Зальцбург", "Мюнхен", "Париж", "Лондон", "Милан", "Вена"],
    journeyBackground: "https://upload.wikimedia.org/wikipedia/commons/2/24/Portrait_of_Mozart_by_Pietro_Antonio_Lorenzoni.jpg",
  },
} as const;

export default function ComposerPassportTabs({ composer, works, hasJourney }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("biography");
  const profile = profiles[composer.slug as keyof typeof profiles] ?? {
    headline: composer.fullName.ru,
    overview: composer.biography.ru,
    traits: ["форма", "мелодия", "ритм", "характер"],
    quote: "Музыка остаётся живой, пока её слушают и исполняют.",
    influence: "Музыкальная среда эпохи, школа, исполнители и собственный художественный опыт.",
    places: [composer.country.ru],
    journeyBackground: composer.portrait ?? "",
  };

  const portrait = composer.slug === "sergei-rachmaninoff" ? "/images/works/rachmaninoff-hero.jpg" : composer.portrait ?? "";

  return (
    <section id="composer-works" className="mt-7 scroll-mt-6">
      <div className="overflow-x-auto border-b border-black/12">
        <div className="flex min-w-max gap-8 px-1 sm:gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`pb-4 text-[11px] transition ${activeTab === tab.key ? "border-b-2 border-[#a67d35] font-semibold text-[#8b6324]" : "text-black/48 hover:text-black/72"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "biography" && (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-2xl border border-black/10 bg-white/58 p-7 sm:p-9">
            <p className="text-[10px] uppercase tracking-[.18em] text-[#9b7130]">Краткая биография</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{profile.headline}</h2>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-black/62 sm:text-base">{profile.overview}</p>
            <Link href="/timeline" className="mt-7 inline-block text-xs text-[#8b6324] hover:underline">Посмотреть в общей хронологии →</Link>
          </article>

          <article className="rounded-2xl border border-black/10 bg-[#192331] p-7 text-[#f0e8db] sm:p-9">
            <p className="text-[10px] uppercase tracking-[.18em] text-[#d1ad68]">Музыкальный почерк</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.traits.map((trait) => <span key={trait} className="rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-xs text-white/68">{trait}</span>)}
            </div>
            <blockquote className="mt-9 font-serif text-2xl italic leading-9 text-white/88">{profile.quote}</blockquote>
          </article>
        </div>
      )}

      {activeTab === "works" && (
        <div className="mt-6">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#9b7130]">Музыкальные паспорта</p>
              <h2 className="mt-2 font-serif text-3xl">Произведения</h2>
            </div>
            <span className="text-xs text-black/42">{works.length} в каталоге</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {works.map((work) => (
              <article key={work.id} className="group overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf9] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden bg-[#ded5c8]">
                  <div className="absolute inset-0 bg-cover bg-top grayscale transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${portrait}')` }} />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,238,228,.98),rgba(244,238,228,.75)_48%,rgba(20,16,11,.14))]" />
                  <div className="relative z-10 max-w-[72%] p-5">
                    <p className="text-[9px] uppercase tracking-[.15em] text-[#9b7130]">{work.passportNumber}</p>
                    <h3 className="mt-4 font-serif text-2xl leading-tight">{work.title.ru}</h3>
                    <p className="mt-2 font-serif text-base text-[#775728]">{work.opus ?? work.catalogue}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-t border-black/10 text-sm">
                  <div className="border-b border-r border-black/10 p-4"><small className="block text-[8px] uppercase tracking-[.1em] text-black/38">Тональность</small><strong className="mt-1 block font-serif font-medium">{work.key?.ru ?? "—"}</strong></div>
                  <div className="border-b border-black/10 p-4"><small className="block text-[8px] uppercase tracking-[.1em] text-black/38">Сложность</small><strong className="mt-1 block font-serif font-medium">{work.difficulty} / 10</strong></div>
                  <div className="border-r border-black/10 p-4"><small className="block text-[8px] uppercase tracking-[.1em] text-black/38">Длительность</small><strong className="mt-1 block font-serif font-medium">{work.duration ?? "—"}</strong></div>
                  <div className="p-4"><small className="block text-[8px] uppercase tracking-[.1em] text-black/38">Ноты</small><strong className="mt-1 block font-serif font-medium text-[#8b6324]">Доступны</strong></div>
                </div>
                <Link href={`/works/${work.slug}`} className="flex items-center justify-between border-t border-black/10 px-5 py-4 text-[10px] uppercase tracking-[.1em] text-[#8b6324]">
                  Открыть паспорт <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <article className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-[#10100e] text-[#eee4cf]">
          <div className="relative min-h-[360px] p-8 sm:p-12">
            <div className="absolute inset-0 bg-cover bg-center opacity-38" style={{ backgroundImage: `url('${profile.journeyBackground}')` }} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,.98)_0%,rgba(7,7,6,.78)_52%,rgba(7,7,6,.18)_100%)]" />
            <div className="relative z-10 max-w-xl">
              <p className="text-[10px] uppercase tracking-[.25em] text-[#d1ad68]">Жизнь в музыке</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">Интерактивная биография вместо обычной шкалы дат.</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{hasJourney ? "Нажмите на большой портрет в верхней части паспорта: биография откроется как бесшовная сцена со скроллом." : "Интерактивная биография этого композитора пока создаётся."}</p>
            </div>
          </div>
        </article>
      )}

      {activeTab === "influence" && (
        <article className="mt-6 rounded-2xl border border-black/10 bg-white/58 p-8 sm:p-10">
          <p className="text-[10px] uppercase tracking-[.18em] text-[#9b7130]">Источники языка</p>
          <h2 className="mt-4 font-serif text-3xl">Что сформировало его музыку</h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-black/62">{profile.influence}</p>
        </article>
      )}

      {activeTab === "quotes" && (
        <article className="mt-6 rounded-2xl border border-black/10 bg-[#ede5d8] p-8 text-center sm:p-12">
          <span className="font-serif text-6xl text-[#b18a49]/45">“</span>
          <blockquote className="mx-auto max-w-3xl font-serif text-3xl italic leading-tight text-[#654a20]">{profile.quote}</blockquote>
        </article>
      )}

      {activeTab === "places" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.places.map((place, index) => (
            <article key={place} className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <span className="font-serif text-4xl text-[#b18a49]/55">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-serif text-2xl">{place}</h3>
              <p className="mt-3 text-sm leading-6 text-black/48">Важная точка в биографии и музыкальной географии композитора.</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
