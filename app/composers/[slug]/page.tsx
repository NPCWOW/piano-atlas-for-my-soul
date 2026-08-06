import Link from "next/link";
import { notFound } from "next/navigation";
import ComposerJourneyLink from "@/components/ComposerJourneyLink";
import ComposerPassportTabs from "@/components/composer/ComposerPassportTabs";
import { composers, getComposerBySlug } from "@/data/composers";
import { getWorksByComposerId } from "@/data/works";

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

  const facts = [
    ["Родился", composer.born],
    ["Умер", composer.died],
    ["Страна", composer.country.ru],
    ["Эпоха", "Поздний романтизм"],
    ["Роли", "Композитор · пианист"],
    ["Наследие", `${composerWorks.length} паспорт произведения`],
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
              src="/images/works/rachmaninoff-hero.jpg"
              alt=""
              className="h-11 w-11 rounded-full object-cover object-[68%_20%] grayscale"
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

          <section className="composer-passport-hero relative min-h-[390px] overflow-hidden rounded-[1.8rem] border border-black/10 bg-[#e9e1d5] shadow-[0_22px_65px_rgba(60,45,20,.1)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,.98),transparent_43%)]" />
            <div className="absolute inset-y-0 right-0 w-[58%] bg-[url('/images/works/rachmaninoff-hero.jpg')] bg-cover bg-[68%_42%] grayscale contrast-110" />
            <div className="absolute inset-y-0 left-[39%] w-44 bg-gradient-to-r from-[#e9e1d5] via-[#e9e1d5]/86 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />

            <div className="relative z-10 max-w-[58%] px-7 py-11 sm:px-10 sm:py-14">
              <p className="text-xs uppercase tracking-[.24em] text-[#9b7130]">Composer Passport · PA-COMP-RACH-0001</p>
              <h1 className="mt-7 font-serif text-4xl leading-[.93] tracking-[-.035em] sm:text-6xl">
                {composer.fullName.ru}
              </h1>
              <p className="mt-6 font-serif text-2xl text-[#735426]">{composer.born}—{composer.died}</p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-black/64 sm:text-base">{composer.biography.ru}</p>
              <div className="mt-7 flex flex-wrap gap-2 text-[10px] uppercase tracking-[.13em] text-[#795925]">
                <span className="rounded-full border border-[#9b7130]/25 bg-white/45 px-4 py-2">Композитор</span>
                <span className="rounded-full border border-[#9b7130]/25 bg-white/45 px-4 py-2">Пианист</span>
                <span className="rounded-full border border-[#9b7130]/25 bg-white/45 px-4 py-2">Дирижёр</span>
              </div>
            </div>

            {isRachmaninoff && <ComposerJourneyLink />}
          </section>

          <section className="relative z-20 -mt-7 grid overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf8]/95 shadow-xl shadow-black/5 backdrop-blur sm:grid-cols-2 xl:grid-cols-6">
            {facts.map(([label, value]) => (
              <div key={label} className="min-h-24 border-b border-r border-black/10 p-4 xl:border-b-0">
                <small className="block text-[9px] uppercase tracking-[.12em] text-black/42">{label}</small>
                <strong className="mt-3 block font-serif text-lg font-medium text-[#684c22]">{value}</strong>
              </div>
            ))}
          </section>

          <ComposerPassportTabs works={composerWorks} />
        </div>
      </section>

      <aside className="fixed inset-y-0 right-0 z-30 hidden w-[310px] overflow-y-auto border-l border-black/10 bg-[#fbf8f2] p-5 lg:block">
        <section className="rounded-2xl border border-black/10 bg-white/65 p-5 shadow-sm">
          <p className="text-[10px] uppercase tracking-[.16em] text-[#9b7130]">Composer Passport</p>
          <h2 className="mt-3 font-serif text-2xl leading-tight">{composer.name.ru}</h2>
          <p className="mt-1 text-sm text-black/50">№ PA-COMP-RACH-0001</p>

          <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
            <div className="relative h-48 bg-[#ded5c8]">
              <div className="absolute inset-0 bg-[url('/images/works/rachmaninoff-hero.jpg')] bg-cover bg-[68%_28%] grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-xs leading-5 text-white/80">Нажмите на большой портрет, чтобы открыть интерактивную биографию.</p>
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

          <div className="mt-5 rounded-xl bg-[#17243a] px-4 py-4 text-center text-sm font-medium text-white">
            ♫ Жизнь в музыке — через портрет
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-black/10 bg-white/65 p-5">
          <h3 className="font-serif text-lg">СТРУКТУРА ПАСПОРТА</h3>
          <div className="mt-5 space-y-3 text-sm text-black/62">
            <div className="flex items-center justify-between border-b border-black/8 pb-3"><span>Обзор</span><span>01</span></div>
            <div className="flex items-center justify-between border-b border-black/8 pb-3"><span>Произведения</span><span>{String(composerWorks.length).padStart(2, "0")}</span></div>
            <div className="flex items-center justify-between border-b border-black/8 pb-3"><span>Жизнь в музыке</span><span>06 глав</span></div>
            <div className="flex items-center justify-between"><span>Архив</span><span>03 раздела</span></div>
          </div>
        </section>
      </aside>
    </main>
  );
}
