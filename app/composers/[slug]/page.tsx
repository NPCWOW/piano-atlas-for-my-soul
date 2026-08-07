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
  { icon: "⌑", label: "Атлас", href: "/atlas" },
  { icon: "♙", label: "Композиторы", href: "/composers" },
  { icon: "♫", label: "Произведения", href: "/works" },
  { icon: "◇", label: "Коллекции", href: "/#collections" },
  { icon: "▣", label: "Моя библиотека", href: "/#library" },
  { icon: "⌕", label: "Поиск", href: "/#search" },
];

export default async function ComposerPassportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const composer = getComposerBySlug(slug);
  if (!composer) notFound();

  const works = getWorksByComposerId(composer.id);
  const isRachmaninoff = composer.slug === "sergei-rachmaninoff";
  const isMozart = composer.slug === "wolfgang-amadeus-mozart";
  const hasJourney = isRachmaninoff || isMozart;
  const portrait = isRachmaninoff ? "/images/works/rachmaninoff-hero.jpg" : composer.portrait ?? "";

  const profile = isRachmaninoff
    ? {
        code: "PA-COMP-RACH-0001",
        era: "Поздний романтизм",
        quote: "«Музыка должна идти от сердца и быть обращена к сердцу».",
        roles: "Композитор · пианист · дирижёр",
        works: "200+",
        pianoWorks: "80+",
        published: "1891—1943",
        genres: "Прелюдии, этюды, концерты, симфонии, романсы",
      }
    : {
        code: "PA-COMP-MOZ-0001",
        era: "Венский классицизм",
        quote: "«Мелодия — сущность музыки».",
        roles: "Композитор · пианист · капельмейстер",
        works: "600+",
        pianoWorks: "100+",
        published: "1761—1791",
        genres: "Сонаты, концерты, симфонии, оперы, камерная музыка",
      };

  const facts = [
    ["Родился", composer.born],
    ["Умер", composer.died ?? "—"],
    ["Страна", composer.country.ru],
    ["Эпоха", profile.era],
    ["Произведения", profile.works],
    ["Фортепианные", profile.pianoWorks],
    ["Публикации", profile.published],
    ["Жанры", profile.genres],
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
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition ${
                item.label === "Композиторы"
                  ? "bg-[#eee6d8] text-[#8c6424]"
                  : "text-black/72 hover:bg-black/[.035]"
              }`}
            >
              <span className="w-5 text-center text-lg text-[#8c6424]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="mb-5 flex items-center justify-between px-3 text-xs text-black/55">
            <span>RU⌄</span>
            <span>◔</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-black/[.035] p-2">
            <img src={portrait} alt="" className="h-11 w-11 rounded-full object-cover object-top grayscale" />
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
              <Link href="/composers">Композиторы</Link>
              <span>›</span>
              <strong className="font-medium text-black/70">{composer.name.ru}</strong>
            </div>
            <Link href="/composers" className="md:hidden">← Назад</Link>
            <div className="flex gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/60 text-[#946b28]">♡</button>
              <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/60">⋮</button>
            </div>
          </div>

          <header className="relative min-h-[330px] overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#e8e0d4] shadow-[0_20px_60px_rgba(60,45,20,.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,.96),transparent_42%)]" />
            <div className="relative z-10 max-w-[58%] px-7 py-10 sm:px-10 sm:py-12">
              <p className="mb-5 text-xs uppercase tracking-[.24em] text-[#9b7130]">
                Composer Passport · {profile.code}
              </p>
              <h1 className="font-serif text-4xl leading-[.98] tracking-[-.035em] sm:text-6xl">
                {composer.fullName.ru}
              </h1>
              <p className="mt-5 font-serif text-lg text-black/55">
                {composer.born}–{composer.died} · {composer.country.ru}
              </p>
              <p className="mt-7 max-w-md font-serif text-lg italic leading-7 text-[#765626]">
                {profile.quote}
              </p>
              <p className="mt-5 text-[10px] uppercase tracking-[.14em] text-black/42">{profile.roles}</p>
            </div>

            <img
              src={portrait}
              alt={composer.name.ru}
              className={`absolute bottom-0 right-0 h-full w-[53%] object-cover object-top grayscale contrast-110 ${isMozart ? "sepia-[.10]" : ""}`}
            />
            <div className="absolute inset-y-0 left-[47%] w-32 bg-gradient-to-r from-[#e8e0d4] via-[#e8e0d4]/80 to-transparent" />

            {hasJourney && (
              <div className="pointer-events-none absolute bottom-8 right-7 z-[18] hidden rounded-full border border-white/30 bg-black/45 px-4 py-2 text-[9px] uppercase tracking-[.14em] text-white/85 backdrop-blur sm:block">
                Нажмите на портрет · жизнь в музыке
              </div>
            )}

            {isRachmaninoff && <ComposerJourneyLink />}
            {isMozart && <MozartJourneyLink />}
          </header>

          <section className="relative z-20 -mt-8 grid overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf8]/95 shadow-xl shadow-black/5 backdrop-blur md:grid-cols-4 xl:grid-cols-8">
            {facts.map(([label, value]) => (
              <div key={label} className="min-h-24 border-b border-r border-black/10 p-4 last:border-r-0 md:border-b-0">
                <small className="block text-[9px] uppercase tracking-[.12em] text-black/42">{label}</small>
                <strong className="mt-3 block font-serif text-base font-medium leading-5 text-[#684c22]">{value}</strong>
              </div>
            ))}
          </section>

          <div className="mt-6">
            <ComposerPassportTabs composer={composer} works={works} hasJourney={hasJourney} />
          </div>
        </div>
      </section>

      <aside className="fixed inset-y-0 right-0 z-30 hidden w-[310px] overflow-y-auto border-l border-black/10 bg-[#fbf8f2] p-5 lg:block">
        <section className="rounded-2xl border border-black/10 bg-white/65 p-5 shadow-sm">
          <h2 className="font-serif text-xl">ПАСПОРТ КОМПОЗИТОРА</h2>
          <p className="mt-1 text-sm text-black/50">№ {profile.code}</p>

          <div className="mt-5 overflow-hidden rounded-xl border border-black/10 bg-[#ded5c8]">
            <div className="relative h-44">
              <img src={portrait} alt="" className="absolute inset-0 h-full w-full object-cover object-top grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-xs text-white/85">{composer.fullName.ru}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-black/10 text-sm">
            {facts.slice(0, 6).map(([label, value]) => (
              <div key={label} className="min-h-20 border-b border-r border-black/10 p-3">
                <small className="block text-[9px] uppercase text-black/40">{label}</small>
                <strong className="mt-2 block font-serif font-medium leading-5">{value}</strong>
              </div>
            ))}
          </div>

          <a href="#composer-works" className="mt-5 block w-full rounded-xl bg-[#17243a] px-4 py-4 text-center text-sm font-medium text-white">
            ♫ Открыть произведения
          </a>
          <button className="mt-3 w-full rounded-xl border border-black/10 px-4 py-4 text-sm">♡ Добавить в библиотеку</button>
        </section>

        <section className="mt-5 rounded-2xl border border-black/10 bg-white/65 p-5">
          <h3 className="font-serif text-lg">БЫСТРАЯ НАВИГАЦИЯ</h3>
          <div className="mt-5 grid grid-cols-4 gap-3 text-center text-[10px] text-black/60">
            {[["▤", "Биография"], ["♫", "Произведения"], ["◷", "Хронология"], ["☆", "Цитаты"]].map(([icon, label]) => (
              <div key={label}>
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-black/5 text-lg text-[#8c6424]">{icon}</span>
                <span className="mt-2 block">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-black/10 bg-[#fffdf8]/95 px-2 py-2 backdrop-blur lg:hidden">
        {[["⌑", "Атлас", "/atlas"], ["♙", "Композиторы", "/composers"], ["♫", "Произведения", "/works"], ["▣", "Библиотека", "/#library"], ["⌕", "Поиск", "/#search"]].map(([icon, label, href]) => (
          <Link key={label} href={href} className={`grid place-items-center gap-1 text-[10px] ${label === "Композиторы" ? "text-[#9b7130]" : "text-black/50"}`}>
            <span className="text-lg">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
