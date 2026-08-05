"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/rachmaninoff-etudes-tableaux-op33-no5-richter.mp3";

const chapters = [
  {
    year: "1873",
    label: "Глава I",
    title: "Рождение",
    text: "Сергей Васильевич Рахманинов родился в дворянской семье. Детство прошло среди русской природы, семейных преданий и первых звуков фортепиано.",
    tone: "birch",
  },
  {
    year: "1892",
    label: "Глава II",
    title: "Первый собственный голос",
    text: "После окончания Московской консерватории молодой композитор создаёт цикл «Пьесы-фантазии». Прелюдия до-диез минор становится музыкой, от которой уже невозможно отделить его имя.",
    tone: "gold",
  },
  {
    year: "1901",
    label: "Глава III",
    title: "Возвращение",
    text: "После тяжёлого творческого кризиса Рахманинов завершает Второй фортепианный концерт. Для него это становится возвращением уверенности и нового художественного голоса.",
    tone: "warm",
  },
  {
    year: "1917",
    label: "Глава IV",
    title: "Отъезд из России",
    text: "Рахманинов покидает Россию и начинает новую жизнь за границей. Концертная деятельность становится необходимостью, а память о родине — одной из главных тем поздней музыки.",
    tone: "ocean",
  },
  {
    year: "1943",
    label: "Глава V",
    title: "Последняя глава",
    text: "Его жизнь завершается в Калифорнии, но музыка продолжает звучать. Концерты, прелюдии и этюды-картины становятся частью мирового репертуара.",
    tone: "night",
  },
];

const chapterBackground: Record<string, string> = {
  birch:
    "bg-[linear-gradient(180deg,rgba(7,9,7,.2),rgba(6,8,6,.86)),radial-gradient(ellipse_at_50%_12%,rgba(217,202,158,.22),transparent_34%),repeating-linear-gradient(90deg,transparent_0_8%,rgba(225,218,194,.10)_8.2%_8.6%,transparent_8.9%_15%)]",
  gold:
    "bg-[radial-gradient(circle_at_72%_42%,rgba(214,187,120,.18),transparent_20%),linear-gradient(125deg,#070706_0%,#17130e_42%,#090806_100%)]",
  warm:
    "bg-[radial-gradient(circle_at_28%_28%,rgba(184,124,58,.15),transparent_28%),linear-gradient(135deg,#1a110b_0%,#0a0806_55%,#050505_100%)]",
  ocean:
    "bg-[radial-gradient(circle_at_76%_30%,rgba(118,145,164,.14),transparent_26%),linear-gradient(135deg,#0a1117_0%,#091016_45%,#050607_100%)]",
  night:
    "bg-[radial-gradient(circle_at_50%_15%,rgba(148,122,92,.12),transparent_24%),linear-gradient(180deg,#121012_0%,#070607_58%,#020202_100%)]",
};

export default function ComposerJourneyLink() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const closeJourney = () => {
    setVisible(false);
    audioRef.current?.pause();
    setPlaying(false);
    window.setTimeout(() => setOpen(false), 500);
  };

  const openJourney = () => {
    if (open) return;
    setOpen(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setVisible(true));
    });
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeJourney();
    };

    window.addEventListener("keydown", onKeyDown);
    overlayRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openJourney}
        aria-label="Открыть путешествие по жизни Сергея Рахманинова"
        className="absolute inset-y-0 right-0 z-[15] w-[54%] cursor-zoom-in rounded-r-[1.7rem] outline-none focus-visible:ring-2 focus-visible:ring-[#a67d35]"
      >
        <span className="absolute bottom-11 right-8 hidden rounded-full border border-white/30 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[.18em] text-white/90 opacity-0 shadow-lg backdrop-blur transition duration-300 hover:opacity-100 sm:block">
          Нажмите на портрет · Жизнь в музыке
        </span>
      </button>

      {open && (
        <div
          ref={overlayRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Жизнь Сергея Рахманинова в музыке"
          className={`fixed inset-0 z-[1000] bg-[#090806] text-[#eee4cf] transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <audio
            ref={audioRef}
            src={AUDIO_SRC}
            preload="metadata"
            loop
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          <button
            type="button"
            onClick={closeJourney}
            className="fixed right-5 top-5 z-[1010] grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/40 text-xl text-white backdrop-blur transition hover:bg-white/10"
            aria-label="Закрыть путешествие"
          >
            ×
          </button>

          <button
            type="button"
            onClick={toggleAudio}
            className="fixed bottom-5 left-5 z-[1010] flex items-center gap-3 rounded-full border border-[#c8a760]/45 bg-black/55 px-5 py-3 text-xs uppercase tracking-[.14em] text-[#dfc58e] backdrop-blur transition hover:bg-black/75"
          >
            <span className="text-base">{playing ? "Ⅱ" : "▶"}</span>
            {playing ? "Пауза" : "Включить музыку"}
          </button>

          <div className="h-full overflow-y-auto overscroll-contain scroll-smooth">
            <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-24 sm:px-12 lg:px-20">
              <div
                className={`absolute inset-0 bg-[url('/images/works/rachmaninoff-hero.jpg')] bg-cover bg-[68%_52%] grayscale transition-all duration-[1400ms] ease-out ${
                  visible ? "scale-110 opacity-80" : "scale-100 opacity-0"
                }`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,transparent_0%,rgba(7,6,4,.15)_36%,rgba(7,6,4,.84)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-transparent to-black/45" />

              <div
                className={`relative z-10 max-w-4xl transition-all delay-300 duration-1000 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <p className="mb-5 text-xs uppercase tracking-[.34em] text-[#c6a45e]">
                  Piano Atlas · Composer Journey
                </p>
                <h2 className="font-serif text-5xl leading-[.92] sm:text-7xl lg:text-8xl">
                  Сергей<br />Рахманинов
                </h2>
                <p className="mt-6 font-serif text-2xl text-white/65">1873—1943</p>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <span className="font-serif text-xl tracking-[.18em] text-[#d8bd82]">A LIFE IN MUSIC</span>
                  <span className="h-px w-20 bg-[#c6a45e]/55" />
                  <span className="text-sm text-white/55">Прокрутите вниз</span>
                </div>
              </div>
            </section>

            <section className="relative bg-[#0d0b08] px-6 py-24 sm:px-12 lg:px-20">
              <div className="pointer-events-none absolute inset-y-0 left-[30px] w-px bg-gradient-to-b from-transparent via-[#b89455]/45 to-transparent sm:left-[55px] lg:left-[87px]" />

              <div className="mx-auto max-w-6xl space-y-24 sm:space-y-32">
                {chapters.map((chapter, index) => (
                  <article
                    key={chapter.year}
                    className="relative grid min-h-[66vh] items-center gap-10 pl-12 sm:pl-20 lg:grid-cols-[180px_1fr] lg:pl-0"
                  >
                    <div className="relative">
                      <span className="absolute -left-[45px] top-5 h-3 w-3 rounded-full border border-[#d4b06e] bg-[#0d0b08] shadow-[0_0_0_8px_rgba(180,145,81,.08)] sm:-left-[70px] lg:hidden" />
                      <p className="font-serif text-5xl text-[#c8a96b] sm:text-6xl lg:text-right">{chapter.year}</p>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-7 shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
                      <div className={`absolute inset-0 opacity-35 ${chapterBackground[chapter.tone]}`} />
                      <div className="relative z-10 max-w-2xl">
                        <p className="text-[10px] uppercase tracking-[.24em] text-[#b99658]">{chapter.label}</p>
                        <h3 className="mt-5 font-serif text-3xl sm:text-5xl">{chapter.title}</h3>
                        <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">{chapter.text}</p>

                        {index === 1 && (
                          <div className="mt-8 rounded-2xl border border-[#c3a15b]/25 bg-black/20 p-5">
                            <p className="text-[10px] uppercase tracking-[.22em] text-[#c6a45e]">Музыка путешествия</p>
                            <p className="mt-3 font-serif text-xl">Études-Tableaux, Op. 33 No. 5</p>
                            <p className="mt-1 text-sm text-white/50">D minor · Moderato · Святослав Рихтер</p>
                            <div className="mt-5 h-px bg-white/15">
                              <div className={`h-px bg-[#d5b56e] transition-all duration-700 ${playing ? "w-2/3" : "w-0"}`} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="flex min-h-[70vh] items-center justify-center bg-black px-6 py-24 text-center">
              <div>
                <p className="font-serif text-4xl text-white/90 sm:text-6xl">Но музыка не заканчивается.</p>
                <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">
                  Это фундамент интерактивной биографии. Следующие версии добавят берёзовую рощу, карты, рукописи, архивные фотографии и более глубокие переходы между сценами.
                </p>
                <button
                  type="button"
                  onClick={closeJourney}
                  className="mt-10 rounded-full border border-[#c8a760]/50 px-7 py-4 text-xs uppercase tracking-[.2em] text-[#dfc58e] transition hover:bg-[#c8a760]/10"
                >
                  Вернуться к Musical Passport
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
