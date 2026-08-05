"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TrackKey = "forest" | "youth" | "triumph" | "ocean" | "america" | "finale";

type Chapter = {
  year: string;
  label: string;
  title: string;
  text: string;
  tone: string;
  track: TrackKey;
  soundLabel: string;
};

const AUDIO: Record<TrackKey, string> = {
  forest: "/audio/journey/01-forest-wind-birds.mp3",
  youth: "/audio/journey/02-early-piano-fragment.mp3",
  triumph: "/audio/journey/03-triumph-full-piece.mp3",
  ocean: "/audio/journey/04-ocean-ship.mp3",
  america: "/audio/journey/05-america-piano.mp3",
  finale: "/audio/journey/06-finale-wind-last-chords.mp3",
};

const chapters: Chapter[] = [
  {
    year: "1873",
    label: "Глава I",
    title: "Детство среди русской природы",
    text: "Ветер, птицы, далёкий колокол и первые звуки домашнего фортепиано. Музыка ещё не звучит целиком — она только возникает из окружающего мира.",
    tone: "birch",
    track: "forest",
    soundLabel: "Ветер · птицы · деревня",
  },
  {
    year: "1885",
    label: "Глава II",
    title: "Первые уроки и консерватория",
    text: "Появляются короткие фортепианные фразы — осторожно, почти как воспоминание. По мере движения вниз они становятся яснее и увереннее.",
    tone: "gold",
    track: "youth",
    soundLabel: "Первые фразы произведения",
  },
  {
    year: "1892",
    label: "Глава III",
    title: "Первый собственный голос",
    text: "После окончания Московской консерватории молодой композитор создаёт цикл «Пьесы-фантазии». Здесь музыка впервые раскрывается полноценно.",
    tone: "warm",
    track: "triumph",
    soundLabel: "Полное музыкальное раскрытие",
  },
  {
    year: "1917",
    label: "Глава IV",
    title: "Отъезд из России",
    text: "Музыка обрывается. Остаются поезд, корабль, вода и ветер. Привычный мир исчезает, а память о родине становится частью позднего музыкального языка.",
    tone: "ocean",
    track: "ocean",
    soundLabel: "Поезд · корабль · океан",
  },
  {
    year: "1920",
    label: "Глава V",
    title: "Америка",
    text: "Музыка возвращается, но уже в другой акустике: крупные залы, новый рояль, концертная жизнь и ощущение пространства между человеком и родиной.",
    tone: "america",
    track: "america",
    soundLabel: "Рояль в новой акустике",
  },
  {
    year: "1943",
    label: "Глава VI",
    title: "Последние годы",
    text: "Фортепиано постепенно растворяется. Остаются ветер и последние аккорды — не как точка, а как продолжение музыки в памяти слушателя.",
    tone: "night",
    track: "finale",
    soundLabel: "Ветер · последние аккорды",
  },
];

const chapterBackground: Record<string, string> = {
  birch:
    "bg-[linear-gradient(180deg,rgba(7,9,7,.18),rgba(6,8,6,.88)),radial-gradient(ellipse_at_50%_12%,rgba(217,202,158,.22),transparent_34%),repeating-linear-gradient(90deg,transparent_0_8%,rgba(225,218,194,.10)_8.2%_8.6%,transparent_8.9%_15%)]",
  gold:
    "bg-[radial-gradient(circle_at_72%_42%,rgba(214,187,120,.18),transparent_20%),linear-gradient(125deg,#070706_0%,#17130e_42%,#090806_100%)]",
  warm:
    "bg-[radial-gradient(circle_at_28%_28%,rgba(184,124,58,.18),transparent_28%),linear-gradient(135deg,#1a110b_0%,#0a0806_55%,#050505_100%)]",
  ocean:
    "bg-[radial-gradient(circle_at_76%_30%,rgba(118,145,164,.18),transparent_26%),linear-gradient(135deg,#0a1117_0%,#091016_45%,#050607_100%)]",
  america:
    "bg-[radial-gradient(circle_at_65%_25%,rgba(210,178,112,.14),transparent_24%),linear-gradient(135deg,#16110c_0%,#0b0a09_48%,#050505_100%)]",
  night:
    "bg-[radial-gradient(circle_at_50%_15%,rgba(148,122,92,.12),transparent_24%),linear-gradient(180deg,#121012_0%,#070607_58%,#020202_100%)]",
};

const FADE_STEP = 0.035;
const FADE_INTERVAL = 45;

export default function ComposerJourneyLink() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeTrack, setActiveTrack] = useState<TrackKey>("forest");
  const [progress, setProgress] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const audioRefs = useRef<Record<TrackKey, HTMLAudioElement | null>>({
    forest: null,
    youth: null,
    triumph: null,
    ocean: null,
    america: null,
    finale: null,
  });
  const fadeTimers = useRef<number[]>([]);
  const introTimer = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const clearAudioTimers = () => {
    fadeTimers.current.forEach((timer) => window.clearInterval(timer));
    fadeTimers.current = [];
    if (introTimer.current) window.clearTimeout(introTimer.current);
    introTimer.current = null;
  };

  const fadeAudio = (audio: HTMLAudioElement, target: number, pauseAtEnd = false) => {
    const timer = window.setInterval(() => {
      const difference = target - audio.volume;
      if (Math.abs(difference) <= FADE_STEP) {
        audio.volume = target;
        window.clearInterval(timer);
        if (pauseAtEnd && target === 0) audio.pause();
        return;
      }
      audio.volume = Math.max(0, Math.min(1, audio.volume + Math.sign(difference) * FADE_STEP));
    }, FADE_INTERVAL);
    fadeTimers.current.push(timer);
  };

  const stopAllAudio = (immediate = false) => {
    clearAudioTimers();
    Object.values(audioRefs.current).forEach((audio) => {
      if (!audio) return;
      if (immediate) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0;
      } else {
        fadeAudio(audio, 0, true);
      }
    });
  };

  const playTrack = async (track: TrackKey, fadeSeconds = 2.2) => {
    if (!soundEnabled) return;
    const next = audioRefs.current[track];
    if (!next) return;

    clearAudioTimers();
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (!audio || key === track) return;
      fadeAudio(audio, 0, true);
    });

    try {
      next.loop = track !== "finale";
      next.volume = 0;
      await next.play();
      const target = track === "forest" || track === "ocean" ? 0.48 : 0.7;
      const steps = Math.max(1, Math.round((fadeSeconds * 1000) / FADE_INTERVAL));
      const customStep = target / steps;
      const timer = window.setInterval(() => {
        next.volume = Math.min(target, next.volume + customStep);
        if (next.volume >= target) window.clearInterval(timer);
      }, FADE_INTERVAL);
      fadeTimers.current.push(timer);
    } catch {
      // Missing or blocked files are allowed while the audio library is being assembled.
    }
  };

  const enableSound = async () => {
    if (soundEnabled) {
      setSoundEnabled(false);
      stopAllAudio();
      return;
    }

    setSoundEnabled(true);
    introTimer.current = window.setTimeout(() => {
      void playTrack(activeTrack, 3.2);
    }, 4500);
  };

  const closeJourney = () => {
    setVisible(false);
    stopAllAudio();
    window.setTimeout(() => {
      setOpen(false);
      setSoundEnabled(false);
      setActiveTrack("forest");
      setProgress(0);
    }, 550);
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
      stopAllAudio(true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;
        const index = Number((visibleEntry.target as HTMLElement).dataset.chapterIndex);
        const chapter = chapters[index];
        if (!chapter || chapter.track === activeTrack) return;
        setActiveTrack(chapter.track);
      },
      { root: scrollRef.current, threshold: [0.35, 0.55, 0.75] },
    );

    chapterRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [open, activeTrack]);

  useEffect(() => {
    if (!soundEnabled) return;
    void playTrack(activeTrack);
  }, [activeTrack, soundEnabled]);

  const updateProgress = () => {
    const element = scrollRef.current;
    if (!element) return;
    const max = element.scrollHeight - element.clientHeight;
    const value = max > 0 ? Math.min(100, (element.scrollTop / max) * 100) : 0;
    setProgress(value);
    if (soundEnabled && value > 94) {
      Object.values(audioRefs.current).forEach((audio) => audio && fadeAudio(audio, 0, true));
    }
  };

  const overlay = open ? (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Жизнь Сергея Рахманинова в музыке"
      className={`fixed inset-0 z-[99999] bg-[#090806] text-[#eee4cf] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {(Object.keys(AUDIO) as TrackKey[]).map((key) => (
        <audio
          key={key}
          ref={(element) => {
            audioRefs.current[key] = element;
          }}
          src={AUDIO[key]}
          preload="metadata"
        />
      ))}

      <div className="fixed inset-x-0 top-0 z-[100020] h-[2px] bg-white/10">
        <div className="h-full bg-[#c8a760] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <button
        type="button"
        onClick={closeJourney}
        className="fixed right-5 top-5 z-[100010] grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/40 text-xl text-white backdrop-blur transition hover:rotate-90 hover:bg-white/10"
        aria-label="Закрыть путешествие"
      >
        ×
      </button>

      <button
        type="button"
        onClick={enableSound}
        className="fixed bottom-5 left-5 z-[100010] flex items-center gap-3 rounded-full border border-[#c8a760]/45 bg-black/55 px-5 py-3 text-xs uppercase tracking-[.14em] text-[#dfc58e] backdrop-blur transition hover:bg-black/75"
      >
        <span className="text-base">{soundEnabled ? "Ⅱ" : "▶"}</span>
        {soundEnabled ? "Выключить звук" : "Начать со звуком"}
      </button>

      <div ref={scrollRef} onScroll={updateProgress} className="h-full overflow-y-auto overscroll-contain scroll-smooth">
        <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-24 sm:px-12 lg:px-20">
          <div
            className={`absolute inset-0 bg-[url('/images/works/rachmaninoff-hero.jpg')] bg-cover bg-[68%_52%] grayscale transition-all duration-[1600ms] ease-out ${visible ? "scale-110 opacity-80" : "scale-100 opacity-0"}`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,transparent_0%,rgba(7,6,4,.15)_36%,rgba(7,6,4,.84)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-transparent to-black/45" />

          <div className={`relative z-10 max-w-4xl transition-all delay-300 duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="mb-5 text-xs uppercase tracking-[.34em] text-[#c6a45e]">Piano Atlas · Composer Journey</p>
            <h2 className="font-serif text-5xl leading-[.92] sm:text-7xl lg:text-8xl">Сергей<br />Рахманинов</h2>
            <p className="mt-6 font-serif text-2xl text-white/65">1873—1943</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <span className="font-serif text-xl tracking-[.18em] text-[#d8bd82]">A LIFE IN MUSIC</span>
              <span className="h-px w-20 bg-[#c6a45e]/55" />
              <span className="text-sm text-white/55">Первые 4,5 секунды — тишина</span>
            </div>
          </div>
        </section>

        <section className="relative bg-[#0d0b08] px-6 py-24 sm:px-12 lg:px-20">
          <div className="pointer-events-none absolute inset-y-0 left-[30px] w-px bg-gradient-to-b from-transparent via-[#b89455]/45 to-transparent sm:left-[55px] lg:left-[87px]" />
          <div className="mx-auto max-w-6xl space-y-24 sm:space-y-32">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.year}
                ref={(element) => {
                  chapterRefs.current[index] = element;
                }}
                data-chapter-index={index}
                className="relative grid min-h-[72vh] items-center gap-10 pl-12 sm:pl-20 lg:grid-cols-[180px_1fr] lg:pl-0"
              >
                <div className="relative">
                  <span className="absolute -left-[45px] top-5 h-3 w-3 rounded-full border border-[#d4b06e] bg-[#0d0b08] shadow-[0_0_0_8px_rgba(180,145,81,.08)] sm:-left-[70px] lg:hidden" />
                  <p className="font-serif text-5xl text-[#c8a96b] sm:text-6xl lg:text-right">{chapter.year}</p>
                </div>

                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-7 shadow-2xl shadow-black/30 backdrop-blur transition duration-700 hover:-translate-y-1 hover:border-[#c3a15b]/30 sm:p-10">
                  <div className={`absolute inset-0 opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-50 ${chapterBackground[chapter.tone]}`} />
                  <div className="relative z-10 max-w-2xl">
                    <p className="text-[10px] uppercase tracking-[.24em] text-[#b99658]">{chapter.label}</p>
                    <h3 className="mt-5 font-serif text-3xl sm:text-5xl">{chapter.title}</h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">{chapter.text}</p>
                    <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[.16em] text-white/50">
                      <span className={`h-2 w-2 rounded-full ${activeTrack === chapter.track && soundEnabled ? "animate-pulse bg-[#d5b56e]" : "bg-white/20"}`} />
                      {chapter.soundLabel}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="flex min-h-[70vh] items-center justify-center bg-black px-6 py-24 text-center">
          <div>
            <p className="font-serif text-4xl text-white/90 sm:text-6xl">Но музыка не заканчивается.</p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">В финале все дорожки плавно затихают. Остаётся только память о последнем аккорде.</p>
            <button type="button" onClick={closeJourney} className="mt-10 rounded-full border border-[#c8a760]/50 px-7 py-4 text-xs uppercase tracking-[.2em] text-[#dfc58e] transition hover:bg-[#c8a760]/10">
              Вернуться к Musical Passport
            </button>
          </div>
        </section>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openJourney}
        aria-label="Открыть путешествие по жизни Сергея Рахманинова"
        className="group absolute inset-y-0 right-0 z-[15] w-[54%] cursor-pointer overflow-hidden rounded-r-[1.7rem] outline-none focus-visible:ring-2 focus-visible:ring-[#a67d35]"
      >
        <span className="absolute inset-6 rounded-[1.35rem] border border-white/0 transition duration-500 group-hover:border-white/25 group-hover:bg-white/[.025]" />
        <span className="absolute bottom-11 right-8 hidden translate-y-3 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-[10px] uppercase tracking-[.18em] text-white/90 opacity-0 shadow-lg backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          Нажмите на портрет · Жизнь в музыке
        </span>
      </button>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
