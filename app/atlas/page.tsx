import Link from "next/link";
import PrimaryNav from "@/components/PrimaryNav";

const eras = [
  {
    title: "Барокко",
    years: "1600—1750",
    subtitle: "Полифония, клавир и архитектура формы",
    background: "linear-gradient(180deg,rgba(16,13,9,.08),rgba(8,7,5,.78)), url('https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg')",
    position: "50% 20%",
  },
  {
    title: "Классицизм",
    years: "1750—1820",
    subtitle: "Баланс, ясность и венская школа",
    background: "linear-gradient(180deg,rgba(16,13,9,.04),rgba(8,7,5,.78)), url('https://upload.wikimedia.org/wikipedia/commons/f/fc/Barbara_Krafft_-_Portr%C3%A4t_Wolfgang_Amadeus_Mozart_%281819%29.jpg')",
    position: "50% 18%",
  },
  {
    title: "Романтизм",
    years: "1820—1900",
    subtitle: "Личность, свобода и большая эмоция",
    background: "linear-gradient(180deg,rgba(16,13,9,.05),rgba(8,7,5,.78)), url('/images/works/rachmaninoff-hero.jpg')",
    position: "68% 24%",
  },
  {
    title: "Модерн",
    years: "1900—настоящее",
    subtitle: "Новые языки, ритмы и тембры",
    background: "linear-gradient(145deg,#26313a 0%,#121a20 42%,#7c6746 43%,#1b2124 58%,#0d1115 100%)",
    position: "center",
  },
  {
    title: "Современность",
    years: "сейчас—будущее",
    subtitle: "Живой репертуар и новые формы",
    background: "linear-gradient(135deg,#d7d1c6 0%,#f5f0e8 34%,#a9a49b 35%,#e6e0d7 58%,#6e716f 59%,#ddd7cc 100%)",
    position: "center",
  },
];

export default function AtlasPage() {
  return (
    <main className="min-h-screen bg-[#f7f3eb] text-[#171714]">
      <PrimaryNav active="Атлас" />
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl">Атлас</h1>
            <p className="mt-2 text-sm text-black/50">Исследуйте историю фортепианной музыки по эпохам.</p>
          </div>
          <Link href="/timeline" className="hidden text-xs uppercase tracking-[.12em] text-[#8b6324] sm:block">
            Перейти к хронологии →
          </Link>
        </div>

        <section className="grid gap-3 md:grid-cols-5">
          {eras.map((era, index) => (
            <article
              key={era.title}
              className="group relative min-h-[420px] overflow-hidden rounded-xl border border-black/10 bg-[#24211d] shadow-[0_18px_45px_rgba(50,38,20,.08)]"
            >
              <div
                className="absolute inset-0 bg-cover transition duration-700 group-hover:scale-105"
                style={{ backgroundImage: era.background, backgroundPosition: era.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/8 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="text-[9px] uppercase tracking-[.2em] text-white/46">Эпоха {String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 font-serif text-3xl">{era.title}</h2>
                <p className="mt-1 font-serif text-base text-white/75">{era.years}</p>
                <p className="mt-4 max-w-[220px] text-xs leading-5 text-white/55 opacity-0 transition duration-300 group-hover:opacity-100">
                  {era.subtitle}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-black/10 bg-white/55 p-7">
            <p className="text-[10px] uppercase tracking-[.18em] text-[#9b7130]">Как пользоваться атласом</p>
            <h2 className="mt-4 font-serif text-3xl">Эпоха → композитор → произведение.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/58">
              Каждая эпоха раскрывается через людей и произведения. Из карточки композитора можно перейти в его паспорт, открыть интерактивную биографию и выбрать отдельный музыкальный паспорт.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-[#1b2533] p-7 text-white">
            <p className="text-[10px] uppercase tracking-[.18em] text-[#d5b36f]">Уже в атласе</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/composers/wolfgang-amadeus-mozart" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:bg-white/5">Моцарт</Link>
              <Link href="/composers/sergei-rachmaninoff" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:bg-white/5">Рахманинов</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
