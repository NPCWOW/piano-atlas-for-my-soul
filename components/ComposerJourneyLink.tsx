"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/rachmaninoff-etudes-tableaux-op33-no5-richter.mp3";

export default function ComposerJourneyLink() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => setVisible(true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeJourney();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openJourney = () => {
    setOpen(true);
  };

  const closeJourney = () => {
    setVisible(false);
    audioRef.current?.pause();
    setPlaying(false);
    window.setTimeout(() => setOpen(false), 650);
  };

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
          role="dialog"
          aria-modal="true"
          aria-label="Жизнь Сергея Рахманинова в музыке"
          className={`fixed inset-0 z-[1000] overflow-y-auto bg-[#090806] text-[#eee4cf] transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <audio
            ref={audioRef}
            src={AUDIO_SRC}
            preload="metadata"
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          <button
            type="button"
            onClick={closeJourney}
            className="fixed right-5 top-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/40 text-xl text-white backdrop-blur transition hover:bg-white/10"
            aria-label="Закрыть путешествие"
          >
            ×
          </button>

          <button
            type="button"
            onClick={toggleAudio}
            className="fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-full border border-[#c8a760]/45 bg-black/55 px-5 py-3 text-xs uppercase tracking-[.14em] text-[#dfc58e] backdrop-blur transition hover:bg-black/75"
          >
            <span className="text-base">{playing ? "Ⅱ" : "▶"}</span>
            {playing ? "Пауза" : "Включить музыку"}
          </button>

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

          <section className="relative min-h-screen overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,7,.2),rgba(6,8,6,.82)),radial-gradient(ellipse_at_50%_15%,rgba(217,202,158,.22),transparent_35%),repeating-linear-gradient(90deg,transparent_0_8%,rgba(225,218,194,.09)_8.2%_8.6%,transparent_8.9%_15%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#090806] via-transparent to-[#090806]" />
            <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-6xl items-center">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[.32em] text-[#c6a45e]">Глава I</p>
                <p className="mt-8 font-serif text-7xl text-[#dec58e] sm:text-9xl">1873</p>
                <h3 className="mt-5 font-serif text-3xl sm:text-5xl">Рождение</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                  Сергей Васильевич Рахманинов родился в дворянской семье. Детство прошло среди русской природы, семейных преданий и первых звуков фортепиано.
                </p>
              </div>
            </div>
          </section>

          <section className="relative min-h-screen overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(214,187,120,.18),transparent_20%),linear-gradient(125deg,#070706_0%,#17130e_42%,#090806_100%)]" />
            <div className="absolute left-[12%] top-[12%] h-[72%] w-px bg-[#c3a15b]/25" />
            <div className="relative z-10 mx-auto grid min-h-[75vh] max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[.32em] text-[#c6a45e]">Глава II</p>
                <p className="mt-8 font-serif text-7xl text-[#dec58e] sm:text-9xl">1892</p>
                <h3 className="mt-5 font-serif text-3xl sm:text-5xl">Первый собственный голос</h3>
                <p className="mt-6 text-base leading-8 text-white/65 sm:text-lg">
                  После окончания Московской консерватории молодой композитор создаёт цикл «Пьесы-фантазии». Прелюдия до-диез минор становится музыкой, от которой уже невозможно отделить его имя.
                </p>
              </div>
              <div className="rounded-[2rem] border border-[#c3a15b]/25 bg-white/[.035] p-8 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[.24em] text-[#c6a45e]">Сейчас в путешествии</p>
                <h4 className="mt-5 font-serif text-2xl">Études-Tableaux, Op. 33 No. 5</h4>
                <p className="mt-2 text-sm text-white/55">D minor · Moderato · Святослав Рихтер</p>
                <div className="mt-8 h-px bg-white/15">
                  <div className={`h-px bg-[#d5b56e] transition-all duration-700 ${playing ? "w-2/3" : "w-0"}`} />
                </div>
                <p className="mt-5 text-sm leading-7 text-white/50">
                  Музыка запускается только после нажатия пользователя. Если аудиофайл ещё не добавлен в проект, интерфейс останется готовым к его подключению.
                </p>
              </div>
            </div>
          </section>

          <section className="flex min-h-[70vh] items-center justify-center bg-black px-6 py-24 text-center">
            <div>
              <p className="font-serif text-4xl text-white/90 sm:text-6xl">Но музыка не заканчивается.</p>
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
      )}
    </>
  );
}
