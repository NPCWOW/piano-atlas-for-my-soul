import Link from "next/link";
import { notFound } from "next/navigation";
import { getComposerById } from "@/data/composers";
import { getWorkBySlug, works } from "@/data/works";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkPassportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) notFound();

  const composer = getComposerById(work.composerId);
  if (!composer) notFound();

  return (
    <main className="min-h-screen bg-[#f2eee6] text-[#171714]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f2eee6]/90 backdrop-blur-xl">
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

      <section className="border-b border-black/10 px-5 py-14 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-[#9b7740]">Musical Passport · {work.passportNumber}</p>
            <p className="mb-3 text-lg text-black/55">{composer.name.ru}</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[.96] tracking-[-.04em] md:text-7xl lg:text-8xl">{work.title.ru}</h1>
            <p className="mt-6 font-serif text-2xl text-black/60">{work.opus}{work.subtitle ? ` · ${work.subtitle.ru}` : ""}</p>
          </div>

          <aside className="rounded-[2rem] border border-black/10 bg-[#1c2433] p-7 text-white shadow-2xl shadow-black/15">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Краткий портрет</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div><small className="text-white/45">ЭПОХА</small><strong className="mt-1 block font-serif text-xl">Романтизм</strong></div>
              <div><small className="text-white/45">ХАРАКТЕР</small><strong className="mt-1 block font-serif text-xl">{work.character[0]?.ru}</strong></div>
              <div><small className="text-white/45">ЦВЕТ</small><div className="mt-3 flex gap-2">{work.palette.map((color) => <i key={color} className="h-7 w-7 rounded-full" style={{ backgroundColor: color }} />)}</div></div>
              <div><small className="text-white/45">УРОВЕНЬ</small><strong className="mt-1 block font-serif text-xl">{work.difficulty}/10</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/10 md:grid-cols-4">
          {work.facts.map((fact) => (
            <div key={fact.label.ru} className="bg-[#faf7f0] p-5 md:p-7">
              <small className="text-[10px] font-semibold uppercase tracking-[.18em] text-black/40">{fact.label.ru}</small>
              <strong className="mt-2 block font-serif text-lg font-medium md:text-xl">{fact.value.ru}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">История создания</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">{work.storyTitle.ru}</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-black/67">
            {work.story.map((paragraph) => <p key={paragraph.ru}>{paragraph.ru}</p>)}
            {work.composerQuote && <p className="rounded-2xl border-l-2 border-[#a7864d] bg-white/55 p-6 font-serif text-2xl leading-relaxed text-black/80">{work.composerQuote.ru}</p>}
          </div>
        </div>
      </section>

      <section className="bg-[#1c2433] px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d3b276]">Музыкальный анализ</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{work.formName?.ru}</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {work.form.map((part) => (
              <article key={part.mark} className="rounded-[1.6rem] border border-white/10 bg-white/[.045] p-7">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl text-[#d3b276]">{part.mark}</span>
                  {part.bars && <small className="rounded-full border border-white/15 px-3 py-1 text-white/45">{part.bars}</small>}
                </div>
                <h3 className="mt-7 font-serif text-2xl">{part.name}</h3>
                <p className="mt-4 leading-7 text-white/58">{part.description.ru}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">Исполнительские задачи</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Что требует особого внимания.</h2>
            <div className="mt-10 space-y-7">
              {work.challenges.map((challenge) => (
                <div key={challenge.name.ru}>
                  <div className="mb-2 flex justify-between gap-4"><strong>{challenge.name.ru}</strong><span className="text-sm text-black/45">{challenge.level.ru}</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#a7864d]" style={{ width: `${challenge.score}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#ded4c2] p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#795b2c]">Что думал автор</p>
            <blockquote className="mt-6 font-serif text-3xl leading-snug md:text-4xl">{work.composerThoughts?.ru}</blockquote>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#faf7f0] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">Знаковые исполнения</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Три разных взгляда.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {work.performances.map((performance, index) => (
              <article key={performance.pianist} className="rounded-[1.6rem] border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                <span className="text-sm text-[#9b7740]">0{index + 1}</span>
                <h3 className="mt-8 font-serif text-2xl">{performance.pianist}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[.12em] text-black/40">{performance.label.ru}</p>
                <p className="mt-5 leading-7 text-black/60">{performance.note.ru}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {[
            ["Изучить до", "Подготовительный маршрут", work.studyBefore],
            ["Изучить после", "Следующий шаг", work.studyAfter],
          ].map(([label, title, items]) => (
            <article key={label as string} className="rounded-[2rem] border border-black/10 p-8">
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9b7740]">{label as string}</p>
              <h3 className="mt-3 font-serif text-3xl">{title as string}</h3>
              <ul className="mt-7 space-y-4 text-black/65">
                {(items as typeof work.studyBefore).map((item) => <li key={`${item.composer}-${item.title.ru}`}>{item.composer} — {item.title.ru}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 px-5 py-10 text-center md:px-10">
        <p className="font-serif text-xl">Piano Atlas for my soul</p>
        <small className="mt-2 block text-black/45">By Lygin Ilya for Lygina Valeriya.</small>
      </footer>
    </main>
  );
}
