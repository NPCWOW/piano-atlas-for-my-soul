import Link from "next/link";
import MozartJourneyLink from "@/components/MozartJourneyLink";
import { mozartWorks } from "@/data/mozart-works";

const work = mozartWorks[0];
const portrait =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/Barbara_Krafft_-_Portr%C3%A4t_Wolfgang_Amadeus_Mozart_%281819%29.jpg";

const navItems = [
  ["⌑", "Атлас"],
  ["♙", "Композиторы"],
  ["♫", "Произведения"],
  ["◇", "Коллекции"],
  ["▣", "Моя библиотека"],
  ["⌕", "Поиск"],
];

const tabs = ["История", "Анализ", "Ноты", "Исполнения", "Рукописи", "Цитаты", "Редакции", "Сложности", "Интересные факты", "Похожие"];

export default function MozartK331PassportPage() {
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
                label === "Произведения" ? "bg-[#eee6d8] text-[#8c6424]" : "text-black/72 hover:bg-black/[.035]"
              }`}
            >
              <span className="w-5 text-center text-lg text-[#8c6424]">{icon}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="mb-5 flex items-center justify-between px-3 text-xs text-black/55"><span>RU⌄</span><span>◔</span></div>
          <Link href="/composers/wolfgang-amadeus-mozart" className="flex items-center gap-3 rounded-xl p-2 hover:bg-black/[.035]">
            <img src={portrait} alt="" className="h-11 w-11 rounded-full object-cover object-top grayscale" />
            <span className="text-xs text-black/62">Профиль<br />композитора</span>
          </Link>
        </div>
      </aside>

      <section className="min-h-screen px-4 pb-28 pt-5 sm:px-6 lg:px-7 lg:pb-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-5 flex items-center justify-between text-xs text-black/45">
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/">Главная</Link><span>›</span><span>Произведения</span><span>›</span>
              <strong className="font-medium text-black/70">{work.title.ru}</strong>
            </div>
            <Link href="/composers/wolfgang-amadeus-mozart" className="md:hidden">← Назад</Link>
            <div className="flex gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/60 text-[#946b28]">♡</button>
              <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/60">⋮</button>
            </div>
          </div>

          <section className="relative min-h-[350px] overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#e9dfcf] shadow-[0_20px_60px_rgba(60,45,20,.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,.98),transparent_42%)]" />
            <div className="absolute bottom-0 right-0 h-full w-[56%] bg-cover bg-[50%_17%] sepia-[.1] contrast-110" style={{ backgroundImage: `url('${portrait}')` }} />
            <div className="absolute inset-y-0 left-[44%] w-40 bg-gradient-to-r from-[#e9dfcf] via-[#e9dfcf]/88 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9b5d31]/10 via-transparent to-white/10" />

            <div className="relative z-10 max-w-[58%] px-7 py-10 sm:px-10 sm:py-12">
              <p className="mb-5 text-xs uppercase tracking-[.24em] text-[#9b7130]">Musical Passport · {work.passportNumber}</p>
              <h1 className="font-serif text-4xl leading-[.96] tracking-[-.035em] sm:text-6xl">{work.title.ru}</h1>
              <Link href="/composers/wolfgang-amadeus-mozart" className="mt-6 block text-sm font-semibold uppercase tracking-[.12em] text-[#9b7130]">
                Вольфганг Амадей Моцарт
              </Link>
              <p className="mt-1 font-serif text-lg text-black/55">1756–1791 · {work.opus}</p>
            </div>

            <MozartJourneyLink />
          </section>

          <section className="relative z-20 -mt-8 grid overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf8]/95 shadow-xl shadow-black/5 backdrop-blur md:grid-cols-4 xl:grid-cols-8">
            {work.facts.slice(0, 8).map((fact) => (
              <div key={fact.label.ru} className="min-h-24 border-b border-r border-black/10 p-4 last:border-r-0 md:border-b-0">
                <small className="block text-[9px] uppercase tracking-[.12em] text-black/42">{fact.label.ru}</small>
                <strong className="mt-3 block font-serif text-lg font-medium text-[#684c22]">{fact.value.ru}</strong>
              </div>
            ))}
          </section>

          <div className="mt-6 overflow-x-auto border-b border-black/10">
            <div className="flex min-w-max gap-7 px-1">
              {tabs.map((tab, index) => (
                <button key={tab} className={`pb-3 text-[11px] uppercase tracking-[.06em] ${index === 0 ? "border-b-2 border-[#a67d35] text-[#8b6324]" : "text-black/52"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <section className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_.9fr_1fr]">
            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">История создания</p>
              {work.story.map((paragraph) => <p key={paragraph.ru} className="mt-5 text-sm leading-6 text-black/72">{paragraph.ru}</p>)}
            </article>

            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Настроение</p>
              <div className="mt-6 space-y-5">
                {work.character.map((item, index) => (
                  <div key={item.ru} className="grid grid-cols-[105px_1fr] items-center gap-3 text-sm">
                    <span>{item.ru}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, dot) => (
                        <i key={dot} className={`h-2.5 w-2.5 rounded-full ${dot < 9 - index ? "bg-[#9f772f]" : "bg-black/10"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Цветовая палитра</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
                <div className="relative h-40 bg-[radial-gradient(circle_at_66%_24%,rgba(255,229,166,.8),transparent_22%),linear-gradient(145deg,#17364b_0%,#35677a_35%,#d0a35a_67%,#8f3c2e_100%)]">
                  <div className="absolute inset-x-0 bottom-[31%] h-px bg-white/35" />
                  <div className="absolute right-[16%] top-[18%] h-14 w-14 rounded-full border border-white/25" />
                  <div className="absolute bottom-[15%] left-[18%] h-20 w-36 rounded-full bg-black/20 blur-xl" />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {work.palette.map((color) => <i key={color} className="h-8 rounded-sm border border-black/5" style={{ backgroundColor: color }} />)}
              </div>
            </article>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Что изучить до</p>
              <ul className="mt-5 space-y-3 text-sm text-black/70">{work.studyBefore.map((item) => <li key={item.title.ru}>✓ {item.composer} — {item.title.ru}</li>)}</ul>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Что изучить после</p>
              <ul className="mt-5 space-y-3 text-sm text-black/70">{work.studyAfter.map((item) => <li key={item.title.ru}>{item.composer} — {item.title.ru}</li>)}</ul>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#9b7130]">Лучшие исполнения</p>
              <div className="mt-5 space-y-3">
                {work.performances.map((item) => (
                  <div key={item.pianist} className="flex items-center justify-between text-sm"><span>{item.pianist}</span><button className="grid h-7 w-7 place-items-center rounded-full border border-[#a67d35] text-[#8b6324]">▶</button></div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </section>

      <aside className="fixed inset-y-0 right-0 z-30 hidden w-[310px] overflow-y-auto border-l border-black/10 bg-[#fbf8f2] p-5 lg:block">
        <section className="rounded-2xl border border-black/10 bg-white/65 p-5 shadow-sm">
          <h2 className="font-serif text-xl">МУЗЫКАЛЬНЫЙ ПАСПОРТ</h2>
          <p className="mt-1 text-sm text-black/50">№ {work.passportNumber}</p>
          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-black/10 text-sm">
            {work.facts.slice(0, 8).map((fact) => (
              <div key={fact.label.ru} className="min-h-20 border-b border-r border-black/10 p-3">
                <small className="block text-[9px] uppercase text-black/40">{fact.label.ru}</small>
                <strong className="mt-2 block font-serif font-medium">{fact.value.ru}</strong>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full rounded-xl bg-[#17243a] px-4 py-4 text-sm font-medium text-white">♫ Открыть ноты</button>
          <button className="mt-3 w-full rounded-xl border border-black/10 px-4 py-4 text-sm">♡ Добавить в библиотеку</button>
        </section>

        <section className="mt-5 rounded-2xl border border-black/10 bg-white/65 p-5">
          <h3 className="font-serif text-lg">КОМПОЗИТОР</h3>
          <Link href="/composers/wolfgang-amadeus-mozart" className="mt-5 flex items-center gap-4 rounded-xl border border-black/10 p-3 transition hover:bg-black/[.025]">
            <img src={portrait} alt="Моцарт" className="h-16 w-16 rounded-xl object-cover object-top grayscale" />
            <span><strong className="block font-serif text-lg">Моцарт</strong><small className="text-black/48">Открыть паспорт</small></span>
          </Link>
        </section>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-black/10 bg-[#fffdf8]/95 px-2 py-2 backdrop-blur lg:hidden">
        {[["⌑", "Атлас"], ["♙", "Композиторы"], ["♫", "Произведения"], ["▣", "Библиотека"], ["⌕", "Поиск"]].map(([icon, label]) => (
          <a key={label} href="#" className={`grid place-items-center gap-1 text-[10px] ${label === "Произведения" ? "text-[#9b7130]" : "text-black/50"}`}><span className="text-lg">{icon}</span>{label}</a>
        ))}
      </nav>
    </main>
  );
}
