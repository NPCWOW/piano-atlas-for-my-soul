import Link from "next/link";
import PrimaryNav from "@/components/PrimaryNav";

const eras = [
  ["Барокко", "1600—1750"],
  ["Классицизм", "1750—1820"],
  ["Романтизм", "1820—1900"],
  ["Модерн", "1900—1950"],
  ["Современность", "1950—сейчас"],
];

const composers = [
  { name: "Бетховен", dates: "1770—1827", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg", href: "/timeline" },
  { name: "Шопен", dates: "1810—1849", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Frederic_Chopin_photo.jpeg", href: "/timeline" },
  { name: "Лист", dates: "1811—1886", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Franz_Liszt_by_Hermann_Biow%2C_1843.png", href: "/timeline" },
  { name: "Чайковский", dates: "1840—1893", image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Pyotr_Ilyich_Tchaikovsky_by_Nikolay_Kuznetsov_1893.jpg", href: "/timeline" },
  { name: "Рахманинов", dates: "1873—1943", image: "/images/works/rachmaninoff-hero.jpg", href: "/composers/sergei-rachmaninoff" },
  { name: "Дебюсси", dates: "1862—1918", image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Claude_Debussy_ca_1908%2C_foto_av_F%C3%A9lix_Nadar.jpg", href: "/timeline" },
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#171714]">
      <PrimaryNav active="Хронология" />
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <div className="mb-9">
          <h1 className="font-serif text-4xl sm:text-5xl">Хронология</h1>
          <p className="mt-2 text-sm text-black/50">Путешествие по истории музыки — от эпох к людям и произведениям.</p>
        </div>

        <section className="relative px-3 pb-6 pt-4">
          <div className="absolute left-[5%] right-[5%] top-[48px] h-px bg-black/20" />
          <div className="relative grid grid-cols-5 gap-2">
            {eras.map(([title, years], index) => (
              <div key={title} className="text-center">
                <strong className="block font-serif text-sm font-medium sm:text-base">{title}</strong>
                <small className="mt-1 block text-[9px] text-black/45">{years}</small>
                <span className={`mx-auto mt-[17px] block rounded-full border-2 border-[#f8f4ed] bg-[#9f772f] shadow-[0_0_0_1px_rgba(159,119,47,.35)] ${index === 2 ? "h-5 w-5" : "h-3 w-3"}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <article className="border-l-2 border-[#a67d35] pl-5 pt-2">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#9b7130]">Романтизм</p>
            <p className="mt-4 text-sm leading-6 text-black/62">
              Романтическая эпоха расширила эмоциональный диапазон фортепиано: индивидуальный голос, виртуозность, национальные школы и новые формы.
            </p>
            <Link href="/atlas" className="mt-6 inline-block text-xs text-[#8b6324] hover:underline">Подробнее об эпохе →</Link>
          </article>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {composers.map((composer) => (
              <Link
                key={composer.name}
                href={composer.href}
                className="group relative min-h-[250px] overflow-hidden rounded-xl border border-black/10 bg-[#2b2721] shadow-sm"
              >
                <div
                  className="absolute inset-0 bg-cover bg-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  style={{ backgroundImage: `url('${composer.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <strong className="font-serif text-lg font-medium">{composer.name}</strong>
                  <small className="mt-1 block text-[10px] text-white/55">{composer.dates}</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-black/10 bg-white/55 p-7 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#9b7130]">Интерактивная история</p>
              <h2 className="mt-3 font-serif text-3xl">От общей шкалы — к жизни конкретного композитора.</h2>
            </div>
            <div className="flex gap-3">
              <Link href="/composers/wolfgang-amadeus-mozart" className="rounded-full border border-black/10 px-5 py-3 text-xs text-[#8b6324] hover:bg-black/[.025]">Моцарт</Link>
              <Link href="/composers/sergei-rachmaninoff" className="rounded-full border border-black/10 px-5 py-3 text-xs text-[#8b6324] hover:bg-black/[.025]">Рахманинов</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
