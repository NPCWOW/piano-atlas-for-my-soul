import Link from "next/link";

const chapters = [
  {
    year: "1873",
    title: "Рождение",
    text: "Сергей Васильевич Рахманинов родился в семье, где музыка была частью повседневной жизни. Начало пути — русская усадьба, природа и первые звуки фортепиано.",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=85",
  },
  {
    year: "1882",
    title: "Учёба и первые впечатления",
    text: "Петербург, затем Москва. Строгая школа, дисциплина и формирование собственного музыкального языка.",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=2200&q=85",
  },
  {
    year: "1892",
    title: "Первый большой голос",
    text: "Прелюдия до-диез минор становится произведением, которое публика требует снова и снова. Молодой композитор внезапно получает узнаваемый голос.",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=2200&q=85",
  },
  {
    year: "1897",
    title: "Кризис",
    text: "После неудачи Первой симфонии наступает тяжёлый период молчания. Пространство истории темнеет — но не заканчивается.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
  },
  {
    year: "1901",
    title: "Возвращение",
    text: "Второй фортепианный концерт становится символом возвращения к творчеству и одним из главных произведений его жизни.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=2200&q=85",
  },
  {
    year: "1917",
    title: "Отъезд из России",
    text: "Начинается новая жизнь: концерты, Европа, Америка. Родина остаётся внутри музыки — как память, ритм и интонация.",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=85",
  },
  {
    year: "1943",
    title: "Последние дни",
    text: "Жизнь заканчивается, но музыка продолжает движение. После последней даты открывается не пустота, а весь каталог произведений.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=85",
  },
];

export default function RachmaninoffJourneyPage() {
  return (
    <main className="bg-[#080706] text-[#eee4cf]">
      <section className="relative min-h-screen overflow-hidden border-b border-[#9d783b]/25">
        <div className="absolute inset-0 bg-[url('/images/works/rachmaninoff-hero.jpg')] bg-cover bg-[62%_42%] grayscale" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.96)_0%,rgba(8,7,6,.68)_40%,rgba(8,7,6,.18)_72%,rgba(8,7,6,.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,transparent_0%,rgba(0,0,0,.18)_48%,rgba(0,0,0,.72)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-between px-6 py-7 md:px-12 lg:px-16">
          <header className="flex items-center justify-between text-xs uppercase tracking-[.2em] text-[#d4b77c]">
            <span>Piano Atlas</span>
            <Link
              href="/works/rachmaninoff-prelude-c-sharp-minor"
              className="rounded-full border border-[#d4b77c]/35 px-4 py-2 transition hover:bg-[#d4b77c]/10"
            >
              Закрыть
            </Link>
          </header>

          <div className="grid items-end gap-10 pb-12 lg:grid-cols-[1fr_390px]">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[.24em] text-[#c8a86d]">Сергей Васильевич</p>
              <h1 className="mt-3 font-serif text-6xl leading-[.9] sm:text-7xl lg:text-8xl">Рахманинов</h1>
              <p className="mt-5 font-serif text-xl text-[#d7c9ad]">1873–1943</p>
              <p className="mt-7 max-w-md text-sm leading-7 text-white/65">
                Пианист. Композитор. Дирижёр. Один из величайших музыкальных голосов своего времени.
              </p>
              <a
                href="#life"
                className="mt-8 inline-flex items-center gap-3 border border-[#c9a86a]/45 px-5 py-3 text-xs uppercase tracking-[.14em] text-[#e0c590] transition hover:bg-[#c9a86a]/10"
              >
                Начать путешествие <span>↓</span>
              </a>
            </div>

            <aside className="rounded-2xl border border-[#b08a49]/30 bg-black/45 p-6 shadow-2xl backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[.18em] text-white/45">Сейчас играет</p>
              <h2 className="mt-3 font-serif text-xl leading-snug text-[#dfc18a]">
                Études-Tableaux Op. 33 No. 5 in D minor — Moderato
              </h2>
              <p className="mt-2 text-sm text-white/58">Исполняет Святослав Рихтер</p>
              <audio
                className="mt-6 w-full opacity-85"
                controls
                preload="metadata"
                src="/audio/rachmaninoff-etudes-tableaux-op33-no5-richter.mp3"
              >
                Ваш браузер не поддерживает аудио.
              </audio>
              <p className="mt-4 text-xs leading-5 text-white/38">
                Музыка не запускается автоматически. Пользователь включает её сам.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section id="life" className="relative">
        <div className="sticky top-0 z-20 flex h-16 items-center justify-center border-b border-[#ad8748]/20 bg-[#080706]/88 px-4 backdrop-blur">
          <p className="font-serif text-xl tracking-[.16em] text-[#d0b277]">A LIFE IN MUSIC</p>
        </div>

        {chapters.map((chapter, index) => (
          <section key={chapter.year} className="relative min-h-[125vh] border-b border-[#ad8748]/15">
            <div
              className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${chapter.image})` }}
            >
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.94)_0%,rgba(8,7,6,.58)_48%,rgba(8,7,6,.22)_100%)]" />
              <div className="absolute inset-y-0 left-[8%] w-px bg-[#c59b57]/35" />
              <div className="absolute left-[calc(8%-5px)] top-1/2 h-2.5 w-2.5 rounded-full border border-[#d3b16f] bg-[#080706]" />

              <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-8 md:px-16 lg:px-24">
                <div className="ml-[8%] max-w-xl pl-10 md:pl-16">
                  <p className="font-serif text-7xl text-[#d6b46f] md:text-8xl">{chapter.year}</p>
                  <p className="mt-4 text-xs uppercase tracking-[.2em] text-[#d4b77c]">
                    {String(index + 1).padStart(2, "0")} · {chapter.title}
                  </p>
                  <p className="mt-6 text-base leading-8 text-white/70 md:text-lg">{chapter.text}</p>
                  {chapter.year === "1892" && (
                    <Link
                      href="/works/rachmaninoff-prelude-c-sharp-minor"
                      className="mt-8 inline-flex border border-[#d0ae69]/45 px-5 py-3 text-xs uppercase tracking-[.14em] text-[#dfc486] transition hover:bg-[#d0ae69]/10"
                    >
                      Открыть Musical Passport
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      <section className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
        <div>
          <p className="font-serif text-3xl text-white/90 md:text-5xl">Но музыка не заканчивается.</p>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">
            История завершается, но произведения продолжают жить — в исполнениях, рукописях, памяти и новых слушателях.
          </p>
          <Link
            href="/composers/sergei-rachmaninoff"
            className="mt-9 inline-flex border border-[#c8a665]/45 px-6 py-3 text-xs uppercase tracking-[.16em] text-[#dbbd82]"
          >
            Перейти к произведениям
          </Link>
        </div>
      </section>
    </main>
  );
}
