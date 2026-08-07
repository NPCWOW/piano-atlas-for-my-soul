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
    overview:
      "В музыке Рахманинова соединяются широкая певучая мелодия, колокольность, сложная фортепианная фактура и исключительное чувство большого драматического дыхания.",
    traits: ["певучесть", "колокольность", "монументальность", "ностальгия", "виртуозность", "широкая форма"],
    quote: "«Музыка должна идти от сердца и быть обращена к сердцу».",
    influence:
      "Русская вокальная интонация, церковная колокольность, Чайковский, московская фортепианная школа и опыт великого концертирующего пианиста.",
    places: ["Семёново и Онег", "Москва", "Ивановка", "Дрезден", "Нью-Йорк", "Беверли-Хиллз"],
  },
  "wolfgang-amadeus-mozart": {
    headline: "Ребёнок-виртуоз, который стал одним из главных драматургов венского классицизма.",
    overview:
      "Моцарт соединяет прозрачную форму с театральностью, живой музыкальной речью, внезапными эмоциональными поворотами и исключительным мелодическим даром.",
    traits: ["ясность", "театр", "певучесть", "контраст", "изящество", "ритмическая энергия"],
    quote: "«Мелодия — сущность музыки».",
    influence:
      "Итальянская опера, Иоганн Кристиан Бах, Гайдн, путешествия по Европе и постоянная работа с театром сформировали его универсальный музыкальный язык.",
    places: ["Зальцбург", "Мюнхен", "Париж", "Лондон", "Милан", "Вена"],
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
  };

  const portrait = composer.slug === "sergei-rachmaninoff" ? "/images/works/rachmaninoff-hero.jpg" : composer.portrait ?? "";
  const popularWorks = works.slice(0, 4);

  const WorkCard = ({ work, detailed = false }: { work: Work; detailed?: boolean }) => (
    <article className="group overflow-hidden rounded-lg border border-black/10 bg-[#f3eee5] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(62,45,18,.10)]">
      <div className={`${detailed ? "h-52" : "h-40"} relative overflow-hidden bg-[#ded6ca]`}>
        <div
          className="absolute inset-0 bg-cover bg-top grayscale transition duration-700 group-hover:scale-[1.035]"
          style={{ backgroundImage: `url('${portrait}')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,9,.04),rgba(12,10,8,.78))]" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-[#f7f0e4]">
          <p className="text-[8px] uppercase tracking-[.14em] text-[#d7b977]">{work.year} · {work.passportNumber}</p>
          <h3 className="mt-2 font-serif text-lg leading-[1.02] sm:text-xl">{work.title.ru}</h3>
          <p className="mt-1 text-[10px] text-white/64">{work.opus ?? work.catalogue}</p>
        </div>
      </div>

      {detailed && (
        <div className="grid grid-cols-2 border-t border-black/10 text-sm">
          <div className="border-b border-r border-black/10 p-3">
            <small className="block text-[8px] uppercase tracking-[.1em] text-black/36">Тональность</small>
            <strong className="mt-1 block font-serif font-medium">{work.key?.ru ?? "—"}</strong>
          </div>
          <div className="border-b border-black/10 p-3">
            <small className="block text-[8px] uppercase tracking-[.1em] text-black/36">Сложность</small>
            <strong className="mt-1 block font-serif font-medium">{work.difficulty} / 10</strong>
          </div>
          <div className="border-r border-black/10 p-3">
            <small className="block text-[8px] uppercase tracking-[.1em] text-black/36">Длительность</small>
            <strong className="mt-1 block font-serif font-medium">{work.duration ?? "—"}</strong>
          </div>
          <div className="p-3">
            <small className="block text-[8px] uppercase tracking-[.1em] text-black/36">Ноты</small>
            <strong className="mt-1 block font-serif font-medium text-[#8b6324]">Открыть</strong>
          </div>
        </div>
      )}

      <Link
        href={`/works/${work.slug}`}
        className="flex items-center justify-between border-t border-black/10 px-4 py-3 text-[9px] uppercase tracking-[.11em] text-[#8b6324]"
      >
        Паспорт произведения <span>→</span>
      </Link>
    </article>
  );

  return (
    <section id="composer-works" className="scroll-mt-6">
      <div className="overflow-x-auto border-b border-black/10">
        <div className="flex min-w-max gap-7 sm:gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative py-4 text-[10px] transition ${
                activeTab === tab.key ? "font-semibold text-[#7e5b23]" : "text-black/48 hover:text-black/72"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#a67d35]" />}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "biography" && (
        <div className="pt-6">
          <div className="grid gap-8 lg:grid-cols-[30%_70%]">
            <article className="pr-6 lg:border-r lg:border-black/10">
              <p className="text-[10px] uppercase tracking-[.16em] text-[#9b7130]">Биография</p>
              <p className="mt-4 text-sm leading-6 text-black/62">{profile.overview}</p>
              <Link href="/timeline" className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.08em] text-[#8b6324]">
                Читать биографию <span>→</span>
              </Link>
            </article>

            <div>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <small className="text-[8px] uppercase tracking-[.12em] text-black/36">Страна</small>
                  <p className="mt-2 font-serif text-lg">{composer.country.ru}</p>
                </div>
                <div>
                  <small className="text-[8px] uppercase tracking-[.12em] text-black/36">Период</small>
                  <p className="mt-2 font-serif text-lg">{composer.born}—{composer.died}</p>
                </div>
                <div>
                  <small className="text-[8px] uppercase tracking-[.12em] text-black/36">Произведений в атласе</small>
                  <p className="mt-2 font-serif text-lg">{works.length}</p>
                </div>
              </div>

              <div className="mt-7 border-t border-black/10 pt-5">
                <small className="text-[8px] uppercase tracking-[.12em] text-black/36">Музыкальный почерк</small>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {profile.traits.map((trait) => (
                    <span key={trait} className="font-serif text-sm text-[#765626]">{trait}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-black/10 pt-6">
            <div className="mb-4 flex items-center justify-between gap-5">
              <h2 className="font-serif text-2xl">Популярные произведения</h2>
              <button type="button" onClick={() => setActiveTab("works")} className="text-[9px] uppercase tracking-[.1em] text-[#8b6324]">
                Все произведения →
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popularWorks.map((work) => <WorkCard key={work.id} work={work} />)}
            </div>
          </div>
        </div>
      )}

      {activeTab === "works" && (
        <div className="pt-6">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-[9px] uppercase tracking-[.16em] text-[#9b7130]">Каталог</p>
              <h2 className="mt-1 font-serif text-3xl">Произведения</h2>
            </div>
            <span className="text-[10px] text-black/40">{works.length} в атласе</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {works.map((work) => <WorkCard key={work.id} work={work} detailed />)}
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <article className="grid gap-8 py-8 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[.16em] text-[#9b7130]">Жизнь в музыке</p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight">Интерактивная биография вместо обычного списка дат.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">
              {hasJourney
                ? "Нажмите на большой портрет в верхней части страницы — откроется бесшовное путешествие по жизни композитора."
                : "Интерактивная биография этого композитора пока создаётся."}
            </p>
          </div>
          <div className="border-l border-black/10 pl-7">
            <div className="space-y-5">
              {[composer.born, "—", composer.died].map((year, index) => (
                <div key={`${year}-${index}`} className="flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full bg-[#a67d35]" />
                  <span className="font-serif text-lg text-[#6d5127]">{year}</span>
                  <span className="text-xs text-black/44">{index === 0 ? "Рождение" : index === 2 ? "Последний год" : "Жизнь и творчество"}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      )}

      {activeTab === "influence" && (
        <article className="py-8">
          <p className="text-[9px] uppercase tracking-[.16em] text-[#9b7130]">Источники языка</p>
          <h2 className="mt-3 font-serif text-3xl">Что сформировало его музыку</h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-black/60">{profile.influence}</p>
        </article>
      )}

      {activeTab === "quotes" && (
        <article className="py-10 text-center">
          <span className="font-serif text-5xl text-[#a67d35]/28">“</span>
          <blockquote className="mx-auto max-w-3xl font-serif text-3xl italic leading-tight text-[#674b20]">{profile.quote}</blockquote>
        </article>
      )}

      {activeTab === "places" && (
        <div className="grid gap-0 py-7 sm:grid-cols-2 lg:grid-cols-3">
          {profile.places.map((place, index) => (
            <article key={place} className="border-b border-r border-black/10 p-5">
              <span className="font-serif text-2xl text-[#a67d35]/45">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-xl">{place}</h3>
              <p className="mt-2 text-xs leading-5 text-black/46">Важная точка в биографии и музыкальной географии композитора.</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
