import Link from "next/link";
import { getComposerBySlug } from "@/data/composers";

const timeline = [
  ["1873", "Рождение", "Родился в дворянской семье в Российской империи."],
  ["1892", "Окончание консерватории", "Получил Большую золотую медаль и начал самостоятельную карьеру."],
  ["1897", "Кризис после Первой симфонии", "Неудачная премьера привела к тяжёлому творческому кризису."],
  ["1901", "Второй фортепианный концерт", "Возвращение к композиции и один из главных успехов его жизни."],
  ["1909", "Третий концерт", "Создан для американского турне и стал вершиной виртуозного репертуара."],
  ["1917", "Отъезд из России", "Начался эмигрантский период и новая жизнь концертирующего пианиста."],
  ["1943", "Последние годы", "Умер в Калифорнии, оставив одно из важнейших наследий позднего романтизма."],
];

const evolution = [
  {
    year: "1892",
    title: "Прелюдия до-диез минор",
    note: "Молодой голос: колокольность, драматизм и ясная крупная форма.",
    href: "/works/rachmaninoff-prelude-c-sharp-minor",
  },
  {
    year: "1901",
    title: "Концерт №2",
    note: "Лирическая зрелость, широкая мелодика и архитектурная уверенность.",
  },
  {
    year: "1909",
    title: "Концерт №3",
    note: "Предельная виртуозность, симфоническое мышление и сложнейшая фактура.",
  },
  {
    year: "1913",
    title: "Соната №2",
    note: "Сжатость, нервная энергия и более концентрированный музыкальный язык.",
  },
  {
    year: "1934",
    title: "Рапсодия на тему Паганини",
    note: "Поздний стиль: прозрачность, ирония и безупречный контроль формы.",
  },
];

const traits = [
  ["Колокольность", 94],
  ["Певучая мелодика", 96],
  ["Виртуозность", 92],
  ["Тёмная драматургия", 88],
  ["Симфоничность", 90],
];

export default function RachmaninoffComposerPage() {
  const composer = getComposerBySlug("sergei-rachmaninoff");

  if (!composer) return null;

  return (
    <main className="min-h-screen bg-[#f2eee6] text-[#171714]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f2eee6]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#a7864d] font-serif text-lg text-[#9d7b42]">LV</span>
            <span>
              <strong className="block font-serif text-lg font-medium">Piano Atlas</strong>
              <small className="block text-[10px] uppercase tracking-[0.24em] text-black/45">for my soul</small>
            </span>
          </Link>
          <Link href="/" className="rounded-full border border-black/15 px-4 py-2 text-sm transition hover:border-[#a7864d] hover:text-[#8c6934]">← На главную</Link>
        </div>
      </header>

      <section className="overflow-hidden border-b border-black/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-10 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[.32em] text-[#9b7740]">The Living Atlas · Composer Profile</p>
            <p className="mt-10 text-lg text-black/50">{composer.born}–{composer.died} · {composer.country.ru}</p>
            <h1 className="mt-3 font-serif text-6xl leading-[.92] tracking-[-.045em] md:text-8xl">
              Сергей<br />
              <em className="font-normal text-[#8d6c38]">Рахманинов</em>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-black/62">{composer.biography.ru}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/works/rachmaninoff-prelude-c-sharp-minor" className="rounded-full bg-[#1c2433] px-6 py-3 text-sm text-white transition hover:-translate-y-0.5">Открыть Musical Passport →</Link>
              <a href="#timeline" className="rounded-full border border-black/15 px-6 py-3 text-sm transition hover:border-[#a7864d]">Хронология жизни</a>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-[2.2rem] bg-[#1c2433] shadow-2xl shadow-black/15 md:min-h-[580px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_25%,rgba(211,178,118,.24),transparent_42%)]" />
            <img
              src={composer.portrait}
              alt="Сергей Рахманинов"
              className="absolute inset-0 h-full w-full object-cover object-top grayscale contrast-110 mix-blend-luminosity"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1c2433] via-[#1c2433]/45 to-transparent p-8 pt-32 text-white">
              <p className="text-xs uppercase tracking-[.28em] text-[#d3b276]">Композитор · пианист · дирижёр</p>
              <p className="mt-3 max-w-md font-serif text-2xl leading-snug">«Музыка должна идти от сердца и быть обращена к сердцу».</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">Musical DNA</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Как звучит его мир.</h2>
            <p className="mt-6 max-w-md leading-7 text-black/58">Не объективный рейтинг, а визуальный профиль черт, которые чаще всего связывают с фортепианным языком Рахманинова.</p>
          </div>
          <div className="space-y-7 rounded-[2rem] border border-black/10 bg-[#faf7f0] p-7 md:p-10">
            {traits.map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between"><strong>{label}</strong><span className="text-sm text-black/40">{value}%</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#a7864d]" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="bg-[#1c2433] px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d3b276]">Жизнь во времени</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">Семь поворотных точек.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2">
            {timeline.map(([year, title, text]) => (
              <article key={year} className="bg-[#1c2433] p-7 md:p-9">
                <span className="font-serif text-4xl text-[#d3b276]">{year}</span>
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-3 leading-7 text-white/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">Творческая эволюция</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Как менялся композитор.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {evolution.map((item, index) => {
              const content = (
                <>
                  <span className="text-sm text-[#9b7740]">0{index + 1} · {item.year}</span>
                  <h3 className="mt-8 font-serif text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-4 leading-7 text-black/58">{item.note}</p>
                  {item.href && <span className="mt-8 inline-block text-sm text-[#8d6c38]">Открыть паспорт →</span>}
                </>
              );

              return item.href ? (
                <Link key={item.year} href={item.href} className="rounded-[1.6rem] border border-black/10 bg-white/55 p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">{content}</Link>
              ) : (
                <article key={item.year} className="rounded-[1.6rem] border border-black/10 bg-white/55 p-7">{content}</article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#faf7f0] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-black/10 bg-white p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9b7740]">Если есть один год</p>
            <h3 className="mt-4 font-serif text-4xl">Маршрут по Рахманинову.</h3>
            <ol className="mt-8 space-y-5 text-black/65">
              <li>01 · Элегия Op. 3 №1</li>
              <li>02 · Прелюдия до-диез минор Op. 3 №2</li>
              <li>03 · Прелюдия соль минор Op. 23 №5</li>
              <li>04 · Музыкальный момент №4</li>
              <li>05 · Этюды-картины</li>
              <li>06 · Соната №2</li>
            </ol>
          </article>
          <article className="rounded-[2rem] bg-[#ded4c2] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#795b2c]">Продолжить путешествие</p>
            <h3 className="mt-4 font-serif text-4xl">От человека — к произведению.</h3>
            <p className="mt-6 max-w-xl leading-7 text-black/60">Первая связанная страница уже готова: подробный Musical Passport прелюдии Op. 3 №2 с историей, формой и исполнительскими задачами.</p>
            <Link href="/works/rachmaninoff-prelude-c-sharp-minor" className="mt-8 inline-flex rounded-full bg-[#1c2433] px-6 py-3 text-sm text-white">Открыть произведение →</Link>
          </article>
        </div>
      </section>

      <footer className="border-t border-black/10 px-5 py-10 text-center md:px-10">
        <p className="font-serif text-xl">Piano Atlas for my soul</p>
        <small className="mt-2 block text-black/45">By Lygin Ilya for Lygina Valeriya.</small>
      </footer>
    </main>
  );
}
