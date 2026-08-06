import Link from "next/link";
import { notFound } from "next/navigation";
import ComposerJourneyLink from "@/components/ComposerJourneyLink";
import MozartJourneyLink from "@/components/MozartJourneyLink";
import ComposerPassportTabs from "@/components/composer/ComposerPassportTabs";
import { composers, getComposerBySlug } from "@/data/composers";
import { getWorksByComposerId } from "@/data/catalog";

export function generateStaticParams() {
  return composers.map((composer) => ({ slug: composer.slug }));
}

const navItems = [
  ["⌑", "Атлас"],
  ["♙", "Композиторы"],
  ["♫", "Произведения"],
  ["◇", "Коллекции"],
  ["▣", "Моя библиотека"],
  ["⌕", "Поиск"],
];

export default async function ComposerPassportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const composer = getComposerBySlug(slug);
  if (!composer) notFound();

  const composerWorks = getWorksByComposerId(composer.id);
  const isRachmaninoff = composer.slug === "sergei-rachmaninoff";
  const isMozart = composer.slug === "wolfgang-amadeus-mozart";
  const hasJourney = isRachmaninoff || isMozart;
  const heroPortrait = isRachmaninoff
    ? "/images/works/rachmaninoff-hero.jpg"
    : composer.portrait ?? "";
  const passportCode = isRachmaninoff ? "RACH-0001" : isMozart ? "MOZ-0001" : composer.id.toUpperCase();

  const eraLabel = isRachmaninoff
    ? "Поздний романтизм"
    : isMozart
      ? "Венский классицизм"
      : "Классическая музыка";

  const roles = isRachmaninoff
    ? ["Композитор", "Пианист", "Дирижёр"]
    : ["Композитор", "Пианист", "Капельмейстер"];

  const facts = [
    ["Родился", composer.born],
    ["Умер", composer.died ?? "—"],
    ["Страна", composer.country.ru],
    ["Эпоха", eraLabel],
    ["Роли", roles.slice(0, 2).join(" · ")],
    ["Паспорта", String(composerWorks.length).padStart(2, "0")],
  ];

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-[#171714] lg:pl-[216px] lg:pr-[310px]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[216px] border-r border-black/10 bg-[#fbf8f2] px-4 py-7 lg:flex lg:flex-col">
        <Link href="/" className="mb-10 text-center">
          <span className="block font-serif text-5xl leading-none text-[#a67d35]">LV</span>
          <strong className="mt-3 block font-serif text-lg font-medium tracking-[.08em]">PIANO ATLAS</strong>
          <small className="font-serif italic text-black/50">for my soul</small>
        </Link>

        <nav className="space-y-2">
          {navItems.map(([icon, label]) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition ${
                label === "Композиторы"
                  ? "bg-[#eee6d8] text-[#8c6424]"
                  : "text-black/72 hover:bg-black/[.035]"
              }`}
            >
              <span className="w-5 text-center text-lg text-[#8c6424]">{icon}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="mb-5 flex items-center justify-between px-3 text-xs text-black/55">
            <span>RU⌄</span>
            <span>◔</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-black/[.035] p-2">
            <img
              src={heroPortrait}
              alt=""
              className="h-11 w-11 rounded-full object-cover object-top grayscale"
            />
            <span className="text-xs text-black/62">Паспорт<br />композитора</span>
          </div>
        </div>
      </aside>

      <section className="min-h-screen px-4 pb-28 pt-5 sm:px-6 lg:px-7 lg:pb-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-5 flex items-center justify-between text-xs text-black/45">
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/">Главная</Link>
              <span>›</span>
              <span>Композиторы</span>
              <span>›</span>
              <strong className="font-medium text-black/70">{composer.name.ru}</strong>
            </div>
            <Link href="/" className="md:hidden">← Назад</Link>
            <div className="flex gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/60 text-[#946b28]">♡</button>
              <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/60">⋮</button>
            </div>
          </div>

          <section className={`relative min-h-[350px] overflow-hidden rounded-[1.7rem] border border-black/10 shadow-[0_20px_60px_rgba(60,45,20,.08)] ${isMozart ? "bg-[#eee2cf]" : "bg-[#e8e0d4]"}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,.96),transparent_42%)]" />
            <div
              className={`absolute bottom-0 right-0 h-full w-[55%] bg-cover grayscale contrast-110 ${isMozart ? "bg-[50%_16%] sepia-[.12]" : "bg-top"}`}
              style={{ backgroundImage: `url('${heroPortrait}')` }}
            />
            <div className={`absolute inset-y-0 left-[45%] w-36 bg-gradient-to-r via-[rgba(232,224,212,.82)] to-transparent ${isMozart ? "from-[#eee2cf]" : "from-[#e8e0d4]"}`} />
            {isMozart && <div className="absolute inset-0 bg-gradient-to-t from-[#9b5d31]/10 via-transparent to-white/10" />}

            <div className="relative z-10 max-w-[58%] px-7 py-10 sm:px-10 sm:py-12">
              <p className="mb-5 text-xs uppercase tracking-[.24em] text-[#9b7130]">
                Composer Passport · PA-COMP-{passportCode}
              </p>
              <h1 className="font-serif text-4xl leading-[.95] tracking-[-.035em] sm:text-6xl">
                {composer.fullName.ru}
              </h1>
              <p className="mt-5 font-serif text-xl text-black/55">
                {composer.born}–{composer.died}
              </p>
              <p className="mt-6 max-w-xl text-sm leading-7 text-black/68 sm:text-base">
                {composer.biography.ru}
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-[10px] uppercase tracking-[.12em] text-[#795925]">
                {roles.map((role) => (
                  <span key={role} className="rounded-full border border-[#9b7130]/25 bg-white/45 px-4 py-2">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {isRachmaninoff && <ComposerJourneyLink />}
            {isMozart && <MozartJourneyLink />}
          </section>

          <section className="relative z-20 -mt-8 grid overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf8]/95 shadow-xl shadow-black/5 backdrop-blur sm:grid-cols-2 xl:grid-cols-6">
            {facts.map(([label, value]) => (
              <div key={label} className="min-h-24 border-b border-r border-black/10 p-4 xl:border-b-0">
                <small className="block text-[9px] uppercase tracking-[.12em] text-black/42">{label}</small>
                <strong className="mt-3 block font-serif text-lg font-medium text-[#684c22]">{value}</strong>
              </div>
            ))}
          </section>

          <ComposerPassportTabs composer={composer} works={composerWorks} hasJourney={hasJourney} />
        </div>
      </section>

      <aside className="fixed inset-y-0 right-0 z-30 hidden w-[310px] overflow-y-auto border-l border-black/10 bg-[#fbf8f2] p-5 lg:block">
        <section className="rounded-2xl border border-black/10 bg-white/65 p-5 shadow-sm">
          <h2 className="font-serif text-xl">ПАСПОРТ КОМПОЗИТОРА</h2>
          <p className="mt-1 text-sm text-black/50">№ PA-COMP-{passportCode}</p>

          <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
            <div className="relative h-48 bg-[#ded5c8]">
              <div
                className={`absolute inset-0 bg-cover grayscale ${isMozart ? "bg-[50%_16%] sepia-[.12]" : "bg-top"}`}
                style={{ backgroundImage: `url('${heroPortrait}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-xs leading-5 text-white/85">
                {hasJourney
                  ? isMozart
                    ? "Нажмите на большой портрет: Моцарт будет перемещаться и постепенно взрослеть."
                    : "Нажмите на большой портрет, чтобы открыть интерактивную биографию."
                  : "Паспорт жизни и творчества композитора."}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-black/10 text-sm">
            {facts.slice(0, 4).map(([label, value]) => (
              <div key={label} className="min-h-20 border-b border-r border-black/10 p-3">
                <small className="block text-[9px] uppercase text-black/40">{label}</small>
                <strong className="mt-2 block font-serif font-medium">{value}</strong>
              </div>
            ))}
          </div>

          <a
            href="#composer-works"
            className="mt-5 block w-full rounded-xl bg-[#17243a] px-4 py-4 text-center text-sm font-medium text-white"
          >
            ♫ Выбрать произведение
          </a>
        </section>

        <section className="mt-5 rounded-2xl border border-black/10 bg-white/65 p-5">
          <h3 className="font-serif text-lg">СТРУКТУРА ПАСПОРТА</h3>
          <div className="mt-5 space-y-3 text-sm text-black/62">
            <div className="flex items-center justify-between border-b border-black/8 pb-3"><span>Обзор</span><span>01</span></div>
            <div className="flex items-center justify-between border-b border-black/8 pb-3"><span>Произведения</span><span>{String(composerWorks.length).padStart(2, "0")}</span></div>
            <div className="flex items-center justify-between border-b border-black/8 pb-3"><span>Жизнь в музыке</span><span>{hasJourney ? "06 глав" : "—"}</span></div>
            <div className="flex items-center justify-between"><span>Архив</span><span>03</span></div>
          </div>
        </section>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-black/10 bg-[#fffdf8]/95 px-2 py-2 backdrop-blur lg:hidden">
        {[["⌑", "Атлас"], ["♙", "Композиторы"], ["♫", "Произведения"], ["▣", "Библиотека"], ["⌕", "Поиск"]].map(([icon, label]) => (
          <a
            key={label}
            href="#"
            className={`grid place-items-center gap-1 text-[10px] ${
              label === "Композиторы" ? "text-[#9b7130]" : "text-black/50"
            }`}
          >
            <span className="text-lg">{icon}</span>
            {label}
          </a>
        ))}
      </nav>
    </main>
  );
}
