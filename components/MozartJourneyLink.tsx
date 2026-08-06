"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const portraits = {
  child:
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Portrait_of_Mozart_by_Pietro_Antonio_Lorenzoni.jpg",
  teen:
    "https://upload.wikimedia.org/wikipedia/commons/4/47/Portrait_of_Wolfgang_Amadeus_Mozart_at_the_age_of_13_in_Verona%2C_1770.jpg",
  adult:
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/Barbara_Krafft_-_Portr%C3%A4t_Wolfgang_Amadeus_Mozart_%281819%29.jpg",
  late:
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_drawing_Doris_Stock_1789.jpg",
};

const chapters = [
  {
    year: "1756",
    kicker: "ЗАЛЬЦБУРГ · ГЛАВА I",
    title: "Сначала музыка была игрой.",
    text: "Дом на Гетрайдегассе, клавир, голоса семьи и ребёнок, который запоминал музыку быстрее, чем успевал записывать её отец.",
    accent: "#d7b56d",
  },
  {
    year: "1763",
    kicker: "ЕВРОПЕЙСКОЕ ТУРНЕ · ГЛАВА II",
    title: "Ребёнок становится чудом Европы.",
    text: "Дворцы, долгие дороги и выступления перед дворами. Лицо остаётся детским, но пространство вокруг него уже принадлежит большой сцене.",
    accent: "#d8a65b",
  },
  {
    year: "1770",
    kicker: "ИТАЛИЯ · ГЛАВА III",
    title: "Юность учится говорить своим голосом.",
    text: "Опера, итальянская вокальность и строгая школа контрапункта. Портрет взрослеет прямо во время движения камеры.",
    accent: "#d07654",
  },
  {
    year: "1781",
    kicker: "ВЕНА · ГЛАВА IV",
    title: "Свобода вместо службы.",
    text: "Моцарт выходит из придворной системы и строит жизнь независимого музыканта: концерты, ученики, новые сонаты и собственный риск.",
    accent: "#6eb5b0",
  },
  {
    year: "1786",
    kicker: "ТЕАТР · ГЛАВА V",
    title: "Человек превращается в театр.",
    text: "В зрелой музыке одновременно смеются, спорят, ревнуют и прощают. Фигура движется сквозь рукописи, сценический свет и голоса персонажей.",
    accent: "#cb806d",
  },
  {
    year: "1791",
    kicker: "ПОСЛЕДНИЙ ГОД · ГЛАВА VI",
    title: "Музыка продолжает движение.",
    text: "Последний портрет становится почти рисунком. Краски уходят, но линия лица и незавершённый жест остаются в пространстве после финального аккорда.",
    accent: "#b9c3d7",
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const fadeWindow = (value: number, start: number, peakStart: number, peakEnd: number, end: number) =>
  Math.min(range(value, start, peakStart), 1 - range(value, peakEnd, end));

const interpolate = (value: number, points: Array<[number, number]>) => {
  if (value <= points[0][0]) return points[0][1];
  if (value >= points[points.length - 1][0]) return points[points.length - 1][1];
  for (let index = 0; index < points.length - 1; index += 1) {
    const [x1, y1] = points[index];
    const [x2, y2] = points[index + 1];
    if (value >= x1 && value <= x2) {
      const amount = (value - x1) / (x2 - x1);
      return y1 + (y2 - y1) * amount;
    }
  }
  return points[points.length - 1][1];
};

export default function MozartJourneyLink() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && closeJourney();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openJourney = () => {
    setOpen(true);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setVisible(true)));
  };

  const closeJourney = () => {
    setVisible(false);
    window.setTimeout(() => {
      setOpen(false);
      setProgress(0);
    }, 500);
  };

  const updateProgress = () => {
    const element = scrollRef.current;
    if (!element) return;
    const max = element.scrollHeight - element.clientHeight;
    setProgress(max > 0 ? clamp(element.scrollTop / max) : 0);
  };

  const activeIndex = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));

  const figure = useMemo(() => {
    const x = interpolate(progress, [
      [0, 69],
      [0.18, 56],
      [0.36, 72],
      [0.56, 45],
      [0.76, 64],
      [1, 50],
    ]);
    const y = interpolate(progress, [
      [0, 53],
      [0.2, 47],
      [0.42, 54],
      [0.63, 46],
      [0.82, 51],
      [1, 49],
    ]);
    const scale = interpolate(progress, [
      [0, 0.78],
      [0.2, 0.94],
      [0.42, 1.06],
      [0.66, 1.2],
      [0.84, 1.34],
      [1, 1.48],
    ]);
    const rotate = interpolate(progress, [
      [0, -4],
      [0.25, 2],
      [0.48, -2],
      [0.72, 3],
      [1, -1],
    ]);
    return { x, y, scale, rotate };
  }, [progress]);

  const sceneHue = interpolate(progress, [
    [0, 36],
    [0.2, 32],
    [0.4, 12],
    [0.62, 178],
    [0.82, 352],
    [1, 220],
  ]);

  const overlay = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Жизнь Вольфганга Амадея Моцарта"
      className={`fixed inset-0 z-[99999] bg-[#080706] text-[#f2e9d7] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="fixed inset-x-0 top-0 z-[100030] h-[2px] bg-white/10">
        <div className="h-full bg-[#d6b269]" style={{ width: `${progress * 100}%` }} />
      </div>

      <button
        type="button"
        onClick={closeJourney}
        className="fixed right-5 top-5 z-[100040] grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/35 text-xl backdrop-blur transition hover:rotate-90 hover:bg-white/10"
        aria-label="Закрыть путешествие"
      >
        ×
      </button>

      <nav className="fixed right-5 top-1/2 z-[100035] hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.year}
            type="button"
            onClick={() => {
              const root = scrollRef.current;
              if (!root) return;
              root.scrollTo({
                top: (root.scrollHeight - root.clientHeight) * (index / (chapters.length - 1)),
                behavior: "smooth",
              });
            }}
            className={`group flex items-center justify-end gap-3 text-[10px] tracking-[.18em] transition ${
              activeIndex === index ? "text-[#e0c27f]" : "text-white/35 hover:text-white/70"
            }`}
          >
            <span className="translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
              {chapter.year}
            </span>
            <i className={`block h-px transition-all ${activeIndex === index ? "w-9 bg-[#d6b269]" : "w-4 bg-white/25"}`} />
            <span>{["I", "II", "III", "IV", "V", "VI"][index]}</span>
          </button>
        ))}
      </nav>

      <div
        ref={scrollRef}
        onScroll={updateProgress}
        className="h-full overflow-y-auto overflow-x-hidden overscroll-contain"
      >
        <div className="relative h-[650vh]">
          <section className="sticky top-0 h-screen overflow-hidden bg-[#0b0907]">
            <div
              className="absolute inset-0 transition-[background] duration-500"
              style={{
                background: `radial-gradient(circle at ${38 + progress * 28}% ${25 + progress * 20}%, hsla(${sceneHue}, 58%, 62%, .28), transparent 28%), linear-gradient(125deg, hsl(${sceneHue} 34% 13%) 0%, #0b0907 58%, #020202 100%)`,
              }}
            />

            <div
              className="absolute -inset-[10%] opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 46px, rgba(235,214,167,.13) 47px 48px), repeating-linear-gradient(90deg, transparent 0 130px, rgba(235,214,167,.05) 131px 132px)",
                transform: `translate3d(${progress * -90}px, ${progress * 45}px, 0) rotate(${progress * 2}deg) scale(1.12)`,
              }}
            />

            <div className="absolute inset-0">
              {Array.from({ length: 22 }).map((_, index) => (
                <i
                  key={index}
                  className="absolute h-1 w-1 rounded-full bg-[#e2c27d]/70 shadow-[0_0_12px_rgba(226,194,125,.8)]"
                  style={{
                    left: `${(index * 41) % 96}%`,
                    top: `${(index * 67) % 90}%`,
                    transform: `translate3d(${Math.sin(index + progress * 4) * 40}px, ${progress * (index % 2 ? -180 : 120)}px, 0)`,
                    opacity: 0.18 + ((index * 7) % 6) / 10,
                  }}
                />
              ))}
            </div>

            <div
              className="absolute z-20 h-[88vh] w-[46vw] min-w-[330px] max-w-[720px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{
                left: `${figure.x}%`,
                top: `${figure.y}%`,
                transform: `translate(-50%, -50%) scale(${figure.scale}) rotate(${figure.rotate}deg)`,
              }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: "ellipse(39% 48% at 51% 45%)",
                  filter: "drop-shadow(0 32px 70px rgba(0,0,0,.65))",
                }}
              >
                <img
                  src={portraits.child}
                  alt="Моцарт в детстве"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_22%] sepia-[.18] saturate-[.78] contrast-[1.08]"
                  style={{ opacity: fadeWindow(progress, -0.04, 0, 0.18, 0.35) }}
                />
                <img
                  src={portraits.teen}
                  alt="Моцарт в юности"
                  className="absolute inset-0 h-full w-full object-cover object-[48%_20%] sepia-[.2] saturate-[.76] contrast-[1.06]"
                  style={{ opacity: fadeWindow(progress, 0.18, 0.34, 0.46, 0.63) }}
                />
                <img
                  src={portraits.adult}
                  alt="Моцарт в зрелые годы"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_18%] sepia-[.2] saturate-[.72] contrast-[1.08]"
                  style={{ opacity: fadeWindow(progress, 0.46, 0.61, 0.78, 0.9) }}
                />
                <img
                  src={portraits.late}
                  alt="Последний прижизненный портрет Моцарта"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_18%] grayscale contrast-[1.08] mix-blend-screen"
                  style={{ opacity: range(progress, 0.78, 0.96) }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-45" />
              </div>
              <div className="absolute inset-[8%] rounded-[48%] border border-[#e0bf77]/20" />
            </div>

            <div className="absolute inset-0 z-30">
              {chapters.map((chapter, index) => {
                const center = index / (chapters.length - 1);
                const opacity = clamp(1 - Math.abs(progress - center) / 0.14);
                const move = (progress - center) * -90;
                const isRight = index % 2 === 1;
                return (
                  <article
                    key={chapter.year}
                    className={`absolute top-1/2 w-[min(560px,78vw)] -translate-y-1/2 ${isRight ? "right-[9%] text-right" : "left-[7%]"}`}
                    style={{ opacity, transform: `translateY(calc(-50% + ${move}px))` }}
                  >
                    <p className="text-[10px] uppercase tracking-[.3em]" style={{ color: chapter.accent }}>
                      {chapter.kicker}
                    </p>
                    <p className="mt-5 font-serif text-[clamp(4.8rem,10vw,9rem)] leading-[.72] text-white/14">
                      {chapter.year}
                    </p>
                    <h2 className="mt-5 font-serif text-[clamp(2.2rem,4.2vw,4.8rem)] leading-[.94] tracking-[-.035em] text-[#f3ead8]">
                      {chapter.title}
                    </h2>
                    <p className={`mt-7 text-sm leading-7 text-white/58 sm:text-base ${isRight ? "ml-auto" : ""} max-w-lg`}>
                      {chapter.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-7 z-40 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[.22em] text-white/40">
              <span className="h-px w-16 bg-white/20" />
              <span>{progress < 0.97 ? "Прокручивайте · портрет взрослеет" : "Музыка остаётся"}</span>
              <span className="h-px w-16 bg-white/20" />
            </div>

            <div className="pointer-events-none absolute inset-0 z-[35] bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.72)_100%)]" />
          </section>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openJourney}
        aria-label="Открыть путешествие по жизни Вольфганга Амадея Моцарта"
        className="group absolute inset-y-0 right-0 z-[20] w-[56%] cursor-pointer overflow-hidden rounded-r-[1.7rem] outline-none focus-visible:ring-2 focus-visible:ring-[#a67d35]"
      >
        <span className="absolute inset-6 rounded-[1.35rem] border border-white/0 transition duration-500 group-hover:border-white/30 group-hover:bg-white/[.025]" />
        <span className="absolute bottom-10 right-8 hidden translate-y-3 rounded-full border border-white/30 bg-black/48 px-4 py-2 text-[10px] uppercase tracking-[.18em] text-white/90 opacity-0 shadow-lg backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          Нажмите на портрет · Моцарт взрослеет
        </span>
      </button>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
