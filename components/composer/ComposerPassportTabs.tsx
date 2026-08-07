"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Composer, Work } from "@/types/music";
import {
  rachmaninoffCatalog,
  rachmaninoffCatalogGenres,
  type RachmaninoffCatalogItem,
} from "@/data/rachmaninoff-catalog";

type TabKey = "biography" | "works" | "timeline" | "influence" | "quotes" | "places";
type CatalogFilter = (typeof rachmaninoffCatalogGenres)[number] | "Концерты для фортепиано с оркестром";

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

const catalogFilters: CatalogFilter[] = [
  "Все",
  "Фортепиано",
  "Концерты для фортепиано с оркестром",
  "Два фортепиано",
  "Камерная",
  "Оркестровая",
  "Вокальная",
  "Хоровая",
  "Опера",
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

function ReadyWorkCard({ work, portrait, detailed = false }: { work: Work; portrait: string; detailed?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`${detailed ? "h-48" : "h-40"} relative overflow-hidden bg-[#ded6ca]`}>
        <div
          className="absolute inset-0 bg-cover bg-top grayscale transition duration-700 group-hover:scale-[1.035]"
          style={{ backgroundImage: `url('${portrait}')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,9,.05),rgba(12,10,8,.80))]" />
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
            <strong className="mt-1 block font-serif font-medium text-[#8b6324]">Доступны</strong>
          </div>
        </div>
      )}

      <Link
        href={`/works/${work.slug}`}
        className="flex items-center justify-between border-t border-black/10 px-4 py-3 text-[9px] uppercase tracking-[.11em] text-[#8b6324]"
      >
        Открыть паспорт <span>→</span>
      </Link>
    </article>
  );
}

function CatalogRow({ item }: { item: RachmaninoffCatalogItem }) {
  const body = (
    <>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-serif text-[17px] leading-5 text-[#2a241d]">{item.title}</h3>
          {item.opus && <span className="text-[10px] font-medium uppercase tracking-[.11em] text-[#9b7130]">{item.opus}</span>}
        </div>
        {item.group && <p className="mt-1 text-[10px] text-black/38">{item.group}</p>}
        {item.note && <p className="mt-2 text-[10px] leading-4 text-[#8a6430]">{item.note}</p>}
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs sm:grid-cols-4 lg:grid-cols-5">
        <div>
          <small className="block text-[7px] uppercase tracking-[.12em] text-black/32">Год</small>
          <span className="mt-1 block text-black/62">{item.year}</span>
        </div>
        <div>
          <small className="block text-[7px] uppercase tracking-[.12em] text-black/32">Жанр</small>
          <span className="mt-1 block text-black/62">{item.genre}</span>
        </div>
        <div>
          <small className="block text-[7px] uppercase tracking-[.12em] text-black/32">Тональность</small>
          <span className="mt-1 block text-black/62">{item.key ?? "—"}</span>
        </div>
        <div>
          <small className="block text-[7px] uppercase tracking-[.12em] text-black/32">Сложность</small>
          <span className="mt-1 block text-black/62">{item.difficulty ? `${item.difficulty} / 10` : "—"}</span>
        </div>
        <div className="hidden lg:block">
          <small className="block text-[7px] uppercase tracking-[.12em] text-black/32">Состав</small>
          <span className="mt-1 block text-black/62">{item.scoring ?? "—"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-black/[.07] pt-3 text-[9px] uppercase tracking-[.1em] sm:border-0 sm:pt-0">
        <span className={item.passportSlug ? "text-[#8b6324]" : "text-black/30"}>
          {item.passportSlug ? "Паспорт готов" : "Паспорт готовится"}
        </span>
        <span className="text-[#9b7130]">{item.passportSlug ? "Открыть →" : "Ноты · каталог"}</span>
      </div>
    </>
  );

  const className =
    "grid gap-4 border-b border-black/[.08] px-1 py-5 transition sm:grid-cols-[1.05fr_1.2fr_auto] sm:items-center sm:gap-7 hover:bg-black/[.018]";

  return item.passportSlug ? (
    <Link href={`/works/${item.passportSlug}`} className={className}>
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  );
}

export default function ComposerPassportTabs({ composer, works, hasJourney }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("biography");
  const [query, setQuery] = useState("");
  const [catalogGenre, setCatalogGenre] = useState<CatalogFilter>("Все");

  const profile = profiles[composer.slug as keyof typeof profiles] ?? {
    headline: composer.fullName.ru,
    overview: composer.biography.ru,
    traits: ["форма", "мелодия", "ритм", "характер"],
    quote: "Музыка остаётся живой, пока её слушают и исполняют.",
    influence: "Музыкальная среда эпохи, школа, исполнители и собственный художественный опыт.",
    places: [composer.country.ru],
  };

  const isRachmaninoff = composer.slug === "sergei-rachmaninoff";
  const portrait = isRachmaninoff ? "/images/works/rachmaninoff-hero.jpg" : composer.portrait ?? "";
  const popularWorks = works.slice(0, 4);

  const filteredRachmaninoffCatalog = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rachmaninoffCatalog.filter((item) => {
      const isPianoConcerto = /^Фортепианный концерт №[1-4]$/.test(item.title);
      const genreMatch =
        catalogGenre === "Все" ||
        (catalogGenre === "Концерты для фортепиано с оркестром" ? isPianoConcerto : item.genre === catalogGenre);
      const queryMatch =
        !needle ||
        item.title.toLowerCase().includes(needle) ||
        item.opus?.toLowerCase().includes(needle) ||
        item.group?.toLowerCase().includes(needle) ||
        item.key?.toLowerCase().includes(needle) ||
        item.year.toLowerCase().includes(needle);
      return genreMatch && Boolean(queryMatch);
    });
  }, [catalogGenre, query]);

  return (
    <section id="composer-works" className="scroll-mt-6">
      <div className="overflow-x-auto border-b border-black/10">
        <div className="flex min-w-max gap-7 px-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative pb-3 text-[11px] uppercase tracking-[.06em] transition ${
                activeTab === tab.key ? "text-[#8b6324]" : "text-black/52 hover:text-black/72"
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
          <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr_1fr]">
            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Биография</p>
              <h2 className="mt-4 font-serif text-2xl leading-tight">{profile.headline}</h2>
              <p className="mt-5 text-sm leading-6 text-black/67">{profile.overview}</p>
              <Link href="/timeline" className="mt-5 inline-block text-[10px] uppercase tracking-[.08em] text-[#8b6324]">
                Общая хронология →
              </Link>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Музыкальный почерк</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.traits.map((trait) => (
                  <span key={trait} className="rounded-full border border-black/10 px-3 py-2 text-xs text-black/62">{trait}</span>
                ))}
              </div>
              <blockquote className="mt-7 font-serif text-xl italic leading-7 text-[#6e5124]">{profile.quote}</blockquote>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">В атласе</p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between border-b border-black/[.07] pb-3"><span className="text-black/48">Полный каталог</span><strong className="font-serif font-medium">{isRachmaninoff ? rachmaninoffCatalog.length : works.length}</strong></div>
                <div className="flex justify-between border-b border-black/[.07] pb-3"><span className="text-black/48">Паспорта готовы</span><strong className="font-serif font-medium">{works.length}</strong></div>
                <div className="flex justify-between"><span className="text-black/48">Страна</span><strong className="font-serif font-medium">{composer.country.ru}</strong></div>
              </div>
            </article>
          </div>

          {popularWorks.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between gap-5">
                <h2 className="font-serif text-2xl">Музыкальные паспорта</h2>
                <button type="button" onClick={() => setActiveTab("works")} className="text-[9px] uppercase tracking-[.1em] text-[#8b6324]">
                  Все произведения →
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {popularWorks.map((work) => <ReadyWorkCard key={work.id} work={work} portrait={portrait} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "works" && (
        <div className="pt-6">
          {works.length > 0 && (
            <section>
              <div className="mb-5 flex items-end justify-between gap-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[.16em] text-[#9b7130]">Готовые страницы</p>
                  <h2 className="mt-1 font-serif text-3xl">Музыкальные паспорта</h2>
                </div>
                <span className="text-[10px] text-black/40">{works.length}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {works.map((work) => <ReadyWorkCard key={work.id} work={work} portrait={portrait} detailed />)}
              </div>
            </section>
          )}

          {isRachmaninoff && (
            <section className="mt-9 border-t border-black/10 pt-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[.16em] text-[#9b7130]">Полный указатель</p>
                  <h2 className="mt-1 font-serif text-3xl">Все произведения Рахманинова</h2>
                  <p className="mt-2 max-w-2xl text-xs leading-5 text-black/45">
                    Opus, отдельные пьесы внутри циклов, ранние сочинения без opus, камерные, вокальные, хоровые, оркестровые и сценические работы.
                  </p>
                </div>
                <div className="text-right">
                  <strong className="font-serif text-3xl font-normal text-[#7a5926]">{filteredRachmaninoffCatalog.length}</strong>
                  <small className="ml-2 text-[9px] uppercase tracking-[.1em] text-black/35">показано</small>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-black/10 bg-white/45 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <label className="relative flex-1">
                    <span className="sr-only">Поиск произведения</span>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Поиск: название, Op. 23, соль минор, 1910…"
                      className="h-11 w-full rounded-xl border border-black/10 bg-[#fffdf8] px-4 text-sm outline-none transition placeholder:text-black/28 focus:border-[#a67d35]/55"
                    />
                  </label>
                  <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max-w-[62%]">
                    {catalogFilters.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => setCatalogGenre(genre)}
                        className={`shrink-0 rounded-full border px-3 py-2 text-[9px] uppercase tracking-[.08em] transition ${
                          catalogGenre === genre
                            ? "border-[#a67d35] bg-[#a67d35] text-white"
                            : "border-black/10 bg-[#fffdf8] text-black/50 hover:border-[#a67d35]/45"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-black/[.08]">
                {filteredRachmaninoffCatalog.map((item) => <CatalogRow key={item.id} item={item} />)}
              </div>

              {filteredRachmaninoffCatalog.length === 0 && (
                <div className="py-14 text-center text-sm text-black/42">По этому запросу ничего не найдено.</div>
              )}
            </section>
          )}

          {!isRachmaninoff && works.length === 0 && (
            <div className="py-14 text-center text-sm text-black/42">Каталог произведений пока наполняется.</div>
          )}
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
              <h3 className="mt-3 font-serif text-xl">{place}</h3>
              <p className="mt-2 text-xs leading-5 text-black/45">Важная точка в биографии и музыкальной географии композитора.</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
