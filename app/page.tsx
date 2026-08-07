import Link from "next/link";
import PrimaryNav from "@/components/PrimaryNav";

const destinations = [
  { icon: "◎", title: "Атлас", subtitle: "Исследовать эпохи", href: "/atlas" },
  { icon: "♫", title: "Произведения", subtitle: "Открыть музыкальные паспорта", href: "/works" },
  { icon: "♙", title: "Композиторы", subtitle: "Встретиться с мастерами", href: "/composers" },
  { icon: "◷", title: "Хронология", subtitle: "История музыки", href: "/timeline" },
  { icon: "▣", title: "Библиотека", subtitle: "Моя музыкальная полка", href: "/#library" },
  { icon: "☆", title: "Коллекции", subtitle: "Тематические подборки", href: "/#collections" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#171714]">
      <div className="mx-auto min-h-screen max-w-[1500px] overflow-hidden border-x border-black/5 bg-[#fbf8f2] shadow-[0_25px_90px_rgba(61,45,21,.10)]">
        <PrimaryNav />

        <section className="relative min-h-[720px] overflow-hidden border-b border-black/10 lg:min-h-[760px]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,242,.99)_0%,rgba(251,248,242,.97)_31%,rgba(251,248,242,.62)_53%,rgba(251,248,242,.08)_76%),url('https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1800&q=88')] bg-cover bg-[68%_center]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,.92),transparent_36%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#eee6d8] via-[#f5efe5]/70 to-transparent" />

          <div className="relative z-10 flex min-h-[610px] items-center px-7 pb-28 pt-12 sm:px-12 md:px-16 lg:px-[8%]">
            <div className="max-w-[520px]">
              <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-[#a37a36]">Музыкальный атлас</p>
              <h1 className="font-serif text-[clamp(3.6rem,6vw,6.5rem)] leading-[.88] tracking-[-.045em]">
                Piano Atlas
                <span className="mt-3 block font-normal italic">for my soul</span>
              </h1>
              <p className="mt-8 font-serif text-xl text-black/72 sm:text-2xl">Исследуйте. Понимайте. Исполняйте.</p>
              <div className="mt-5 h-px w-28 bg-[#a67d35]" />
              <p className="mt-6 max-w-md text-sm leading-7 text-black/56 sm:text-base">
                История музыки, композиторы, произведения и личная библиотека — в одном спокойном пространстве.
              </p>
              <Link
                href="/atlas"
                className="mt-8 inline-flex items-center gap-5 rounded-lg bg-[#a67d35] px-6 py-4 text-xs font-semibold uppercase tracking-[.08em] text-white shadow-lg shadow-[#a67d35]/20 transition hover:-translate-y-0.5 hover:bg-[#8f692d]"
              >
                Войти в атлас <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          <div className="absolute inset-x-7 bottom-7 z-20 grid grid-cols-2 gap-2 sm:inset-x-10 sm:grid-cols-3 lg:inset-x-14 lg:grid-cols-6">
            {destinations.map((item) => (
              <Link
                key={item.title}
                id={item.title === "Библиотека" ? "library" : item.title === "Коллекции" ? "collections" : undefined}
                href={item.href}
                className="group min-h-[122px] rounded-xl border border-black/8 bg-[#fffdf9]/92 p-5 text-center shadow-[0_12px_32px_rgba(42,31,14,.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#a67d35]/30"
              >
                <span className="mx-auto block font-serif text-3xl text-[#a67d35] transition group-hover:scale-110">{item.icon}</span>
                <strong className="mt-3 block font-serif text-base font-medium">{item.title}</strong>
                <small className="mt-1 block text-[10px] leading-4 text-black/45">{item.subtitle}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 px-7 py-14 sm:px-12 lg:grid-cols-[1fr_auto] lg:px-16">
          <div>
            <p className="text-[10px] uppercase tracking-[.24em] text-[#a37a36]">Piano Atlas for my soul</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
              Не просто энциклопедия, а место, где биография композитора соединяется с произведениями и музыкой.
            </h2>
          </div>
          <div className="flex items-end">
            <Link href="/composers/sergei-rachmaninoff" className="text-sm text-[#8b6324] hover:underline">
              Открыть паспорт Рахманинова →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
