"use client";

import { useEffect, useState } from "react";
import JourneySceneEngine from "./JourneySceneEngine";
import SceneMistEdge from "./SceneMistEdge";

type ConservatorySceneProps = {
  active: boolean;
  soundEnabled: boolean;
  registerRef: (element: HTMLElement | null) => void;
};

export default function ConservatoryScene({ active, soundEnabled, registerRef }: ConservatorySceneProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 650);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <JourneySceneEngine
      active={active}
      chapterIndex={1}
      onRegister={registerRef}
      backgroundImage="/images/journey/rachmaninoff-conservatory.png"
      backgroundPosition="center 46%"
      particles="dust"
      overlayVariant="interior"
    >
      <SceneMistEdge position="top" />

      <div className="relative z-20 mx-auto flex min-h-[112vh] max-w-[1600px] items-end justify-end px-7 pb-24 pt-24 sm:px-12 lg:px-20 xl:px-24">
        <div
          className={`max-w-[660px] text-left transition-all duration-[1500ms] ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[.3em] text-[#d2b16a]">
            <span>Глава II</span>
            <span className="h-px w-16 bg-[#d2b16a]/45" />
            <span>{soundEnabled ? "Шаги · ноты · рояль" : "Без звука"}</span>
          </div>

          <p className="font-serif text-[clamp(5.2rem,11vw,9.6rem)] leading-[.8] tracking-[-.055em] text-[#e2c887] drop-shadow-[0_8px_30px_rgba(0,0,0,.5)]">1885</p>
          <p className="mt-8 text-[11px] uppercase tracking-[.38em] text-white/52">Москва · Консерватория</p>
          <h3 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.02] text-[#f3ede2] sm:text-6xl lg:text-7xl">Первые уроки и консерватория</h3>
          <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/66 sm:text-[17px] sm:leading-8">Шаги гулко звучат по коридору, страницы нот шуршат в тишине, а первые фразы за роялем постепенно складываются в собственный музыкальный язык.</p>

          <div className="mt-9 flex flex-wrap gap-3">
            {["Эхо зала", "Перелистывание нот", "18 секунд музыки"].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[.16em] text-white/52 backdrop-blur">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-[7%] top-[12%] hidden h-[58%] w-[1px] bg-gradient-to-b from-transparent via-[#e0c27c]/42 to-transparent lg:block" />
      <div className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 text-[10px] uppercase tracking-[.2em] text-white/38 lg:flex">
        {["I", "II", "III", "IV", "V", "VI"].map((label, index) => (
          <div key={label} className="flex items-center gap-3">
            <span className={`h-px ${index === 1 ? "w-7 bg-[#caa65d]" : "w-4 bg-white/16"}`} />
            <span className={index === 1 ? "text-[#d9bd7c]" : "text-white/32"}>{label}</span>
          </div>
        ))}
      </div>
    </JourneySceneEngine>
  );
}
