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

  const stats = [
    ["Произведения", profile.works],
    ["Фортепианные", profile.pianoWorks],
    ["Публикации", profile.published],
    ["Жанры", profile.genres],
  ];

  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#171714]">
      <div className="mx-auto min-h-screen max-w-[1500px] border-x border-black/[.045] bg-[#fbf8f2] shadow-[0_20px_70px_rgba(67,48,18,.06)]">
        <PrimaryNav active="Композиторы" />

        <section className="relative overflow-hidden border-b border-black/10">
          <div className="relative min-h-[430px] sm:min-h-[470px] lg:min-h-[505px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,.98),transparent_38%)]" />

            <div
              className={`absolute bottom-0 right-0 h-[96%] w-[58%] bg-contain bg-bottom bg-no-repeat grayscale contrast-[1.08] ${
                isMozart ? "sepia-[.10]" : ""
              }`}
              style={{ backgroundImage: `url('${portrait}')` }}
            />
            <div className="absolute inset-y-0 left-[38%] w-[31%] bg-gradient-to-r from-[#fbf8f2] via-[#fbf8f2]/92 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#fbf8f2] via-[#fbf8f2]/62 to-transparent" />

            <div className="relative z-10 px-7 pb-24 pt-7 sm:px-10 lg:px-14">
              <div className="flex items-center gap-3 text-[10px] text-black/46">
                <Link href="/composers" className="transition hover:text-[#8b6324]">← Композиторы</Link>
                <span className="text-black/20">•</span>
                <span>{profile.era}</span>
              </div>

              <div className="mt-14 max-w-[49%] sm:mt-16 lg:mt-20">
                <h1 className="font-serif text-[clamp(2.8rem,5vw,5.4rem)] leading-[.92] tracking-[-.045em]">
                  {composer.fullName.ru}
                </h1>
                <p className="mt-5 font-serif text-xl text-black/48 sm:text-2xl">
                  {composer.born} — {composer.died}
                </p>
                <p className="mt-7 max-w-sm font-serif text-[clamp(1.05rem,1.55vw,1.4rem)] italic leading-7 text-[#8b6324] sm:leading-8">
                  {profile.quote}
                </p>
                <div className="mt-6 h-px w-16 bg-[#a67d35]" />
              </div>
            </div>

            {hasJourney && (
              <div className="pointer-events-none absolute bottom-16 right-8 z-[18] hidden text-right sm:block">
                <p className="text-[9px] uppercase tracking-[.18em] text-black/40">Интерактивный портрет</p>
                <p className="mt-1 font-serif text-sm italic text-[#8b6324]">Нажмите, чтобы открыть жизнь в музыке</p>
              </div>
            )}

            {isRachmaninoff && <ComposerJourneyLink />}
            {isMozart && <MozartJourneyLink />}
          </div>

          <div className="relative z-30 -mt-[54px] px-7 sm:px-10 lg:px-14">
            <div className="grid gap-0 border-t border-black/10 bg-[#fbf8f2]/95 lg:grid-cols-[31%_69%]">
              <div className="border-r border-black/10 px-0 py-5 pr-8">
                <p className="text-[10px] uppercase tracking-[.14em] text-[#9b7130]">Коротко</p>
                <p className="mt-3 max-w-[310px] text-xs leading-5 text-black/58 sm:text-sm sm:leading-6">
                  {composer.biography.ru}
                </p>
                <p className="mt-4 text-[9px] uppercase tracking-[.14em] text-black/34">{profile.roles}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4">
                {stats.map(([label, value]) => (
                  <div key={label} className="min-h-[108px] border-b border-r border-black/10 px-5 py-5 sm:border-b-0">
                    <small className="block text-[8px] uppercase tracking-[.1em] text-black/38">{label}</small>
                    <strong className="mt-3 block font-serif text-base font-medium leading-5 text-[#674b20] sm:text-lg">
                      {value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="px-7 pb-16 sm:px-10 lg:px-14">
          <ComposerPassportTabs composer={composer} works={works} hasJourney={hasJourney} />
        </div>
      </div>
    </main>
  );
}
