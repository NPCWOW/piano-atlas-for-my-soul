import Link from "next/link";
import { notFound } from "next/navigation";
import ComposerJourneyLink from "@/components/ComposerJourneyLink";
import MozartJourneyLink from "@/components/MozartJourneyLink";
import ComposerPassportTabs from "@/components/composer/ComposerPassportTabs";
import PrimaryNav from "@/components/PrimaryNav";
import { composers, getComposerBySlug } from "@/data/composers";
import { getWorksByComposerId } from "@/data/catalog";

export function generateStaticParams() {
  return composers.map((composer) => ({ slug: composer.slug }));
}

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
        era: "Поздний романтизм",
        quote: "«Музыка должна идти от сердца и быть обращена к сердцу».",
        roles: "Композитор · пианист · дирижёр",
        works: "200+",
        pianoWorks: "80+",
        published: "1891—1943",
        genres: "Прелюдии, этюды, концерты, симфонии, романсы",
      }
    : {
        era: "Венский классицизм",
        quote: "«Мелодия — сущность музыки».",
        roles: "Композитор · пианист · капельмейстер",
        works: "600+",
        pianoWorks: "100+",
        published: "1761—1791",
        genres: "Сонаты, концерты, симфонии, оперы, камерная музыка",
      };

  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#171714]">
      <PrimaryNav active="Композиторы" />

      <div className="mx-auto max-w-[1500px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 py-5 text-[11px] text-black/45">
          <Link href="/composers" className="hover:text-[#8b6324]">← Композиторы</Link>
          <span>•</span>
          <span>{composer.name.ru}</span>
        </div>

        <section className="relative min-h-[570px] overflow-hidden rounded-[28px] border border-black/10 bg-[#f3ede4] shadow-[0_24px_70px_rgba(66,49,24,.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_19%_22%,rgba(255,255,255,.98),transparent_34%)]" />
          <div className="absolute inset-y-0 right-0 w-[57%] bg-cover bg-top grayscale contrast-110" style={{ backgroundImage: `url('${portrait}')` }} />
          <div className="absolute inset-y-0 left-[37%] w-[26%] bg-gradient-to-r from-[#f3ede4] via-[#f3ede4]/88 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f3ede4]/90 via-transparent to-white/15" />

          <div className="relative z-10 flex min-h-[505px] items-center px-7 py-12 sm:px-10 lg:px-14">
            <div className="max-w-[52%]">
              <p className="text-[10px] uppercase tracking-[.22em] text-[#9b7130]">Паспорт композитора · {profile.era}</p>
              <h1 className="mt-7 font-serif text-[clamp(3.2rem,5.4vw,6rem)] leading-[.9] tracking-[-.045em]">
                {composer.fullName.ru}
              </h1>
              <p className="mt-5 font-serif text-2xl text-black/52">{composer.born} — {composer.died}</p>
              <div className="mt-6 h-px w-20 bg-[#a67d35]" />
              <p className="mt-6 max-w-md font-serif text-xl italic leading-8 text-[#8b6324]">{profile.quote}</p>
              <p className="mt-7 max-w-lg text-sm leading-7 text-black/58">{composer.biography.ru}</p>
              <p className="mt-5 text-[10px] uppercase tracking-[.16em] text-black/38">{profile.roles}</p>
            </div>
          </div>

          <div className="absolute bottom-6 right-7 z-[12] hidden rounded-full border border-white/35 bg-black/45 px-4 py-2 text-[9px] uppercase tracking-[.16em] text-white/85 backdrop-blur sm:block">
            Портрет интерактивен · открыть жизнь в музыке
          </div>

          {isRachmaninoff && <ComposerJourneyLink />}
          {isMozart && <MozartJourneyLink />}
        </section>

        <section className="relative z-20 -mt-7 grid overflow-hidden rounded-2xl border border-black/10 bg-[#fffdf9]/95 shadow-[0_18px_45px_rgba(53,39,18,.08)] backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Произведения", profile.works],
            ["Фортепианные", profile.pianoWorks],
            ["Период публикаций", profile.published],
            ["Основные жанры", profile.genres],
          ].map(([label, value]) => (
            <div key={label} className="min-h-[110px] border-b border-r border-black/10 p-5 lg:border-b-0">
              <small className="block text-[9px] uppercase tracking-[.12em] text-black/38">{label}</small>
              <strong className="mt-3 block font-serif text-lg font-medium leading-6 text-[#684c22]">{value}</strong>
            </div>
          ))}
        </section>

        <ComposerPassportTabs composer={composer} works={works} hasJourney={hasJourney} />
      </div>
    </main>
  );
}
