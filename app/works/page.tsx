import Link from "next/link";
import PrimaryNav from "@/components/PrimaryNav";
import { works } from "@/data/catalog";
import { getComposerById } from "@/data/composers";

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#171714]">
      <PrimaryNav active="Произведения" />
      <div className="mx-auto max-w-[1300px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mb-9">
          <p className="text-[10px] uppercase tracking-[.2em] text-[#9b7130]">Музыкальные паспорта</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Произведения</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/52">Ноты, тональность, форма, сложность, история создания и лучшие исполнения.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => {
            const composer = getComposerById(work.composerId);
            const portrait = composer?.slug === "sergei-rachmaninoff" ? "/images/works/rachmaninoff-hero.jpg" : composer?.portrait ?? "";
            return (
              <Link key={work.id} href={`/works/${work.slug}`} className="group overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf9] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-56 bg-[#ded5c8]">
                  <div className="absolute inset-0 bg-cover bg-top grayscale transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${portrait}')` }} />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,238,228,.96),rgba(244,238,228,.66)_46%,rgba(20,16,11,.12))]" />
                  <div className="relative z-10 max-w-[70%] p-6">
                    <p className="text-[9px] uppercase tracking-[.16em] text-[#9b7130]">{composer?.name.ru}</p>
                    <h2 className="mt-4 font-serif text-2xl leading-tight">{work.title.ru}</h2>
                    <p className="mt-3 font-serif text-lg text-[#775728]">{work.opus ?? work.catalogue}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-t border-black/10 text-sm">
                  <div className="border-b border-r border-black/10 p-4"><small className="block text-[9px] uppercase text-black/38">Тональность</small><strong className="mt-1 block font-serif font-medium">{work.key?.ru ?? "—"}</strong></div>
                  <div className="border-b border-black/10 p-4"><small className="block text-[9px] uppercase text-black/38">Сложность</small><strong className="mt-1 block font-serif font-medium">{work.difficulty} / 10</strong></div>
                  <div className="border-r border-black/10 p-4"><small className="block text-[9px] uppercase text-black/38">Год</small><strong className="mt-1 block font-serif font-medium">{work.year}</strong></div>
                  <div className="p-4"><small className="block text-[9px] uppercase text-black/38">Ноты</small><strong className="mt-1 block font-serif font-medium text-[#8b6324]">Открыть →</strong></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
