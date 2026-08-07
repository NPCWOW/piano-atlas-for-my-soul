import Link from "next/link";
import PrimaryNav from "@/components/PrimaryNav";
import { composers } from "@/data/composers";

export default function ComposersPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#171714]">
      <PrimaryNav active="Композиторы" />
      <div className="mx-auto max-w-[1300px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mb-9">
          <p className="text-[10px] uppercase tracking-[.2em] text-[#9b7130]">Piano Atlas</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Композиторы</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/52">Откройте паспорт композитора, его интерактивную биографию и каталог произведений.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {composers.map((composer) => {
            const portrait = composer.slug === "sergei-rachmaninoff" ? "/images/works/rachmaninoff-hero.jpg" : composer.portrait ?? "";
            return (
              <Link key={composer.id} href={`/composers/${composer.slug}`} className="group relative min-h-[390px] overflow-hidden rounded-2xl border border-black/10 bg-[#e8e0d4] shadow-sm">
                <div className="absolute inset-y-0 right-0 w-[58%] bg-cover bg-top grayscale transition duration-700 group-hover:scale-[1.025]" style={{ backgroundImage: `url('${portrait}')` }} />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,238,228,.99)_0%,rgba(244,238,228,.92)_42%,rgba(244,238,228,.14)_76%)]" />
                <div className="relative z-10 flex min-h-[390px] max-w-[58%] flex-col justify-end p-7 sm:p-9">
                  <p className="text-[10px] uppercase tracking-[.18em] text-[#9b7130]">Паспорт композитора</p>
                  <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{composer.fullName.ru}</h2>
                  <p className="mt-3 font-serif text-xl text-black/55">{composer.born}—{composer.died}</p>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-black/58">{composer.biography.ru}</p>
                  <span className="mt-7 text-xs uppercase tracking-[.12em] text-[#8b6324]">Открыть паспорт →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
