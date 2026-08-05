"use client";

import { useEffect, useState } from "react";
import JourneySceneEngine from "./JourneySceneEngine";

type ChildhoodSceneProps = {
  active: boolean;
  soundEnabled: boolean;
  registerRef: (element: HTMLElement | null) => void;
};

export default function ChildhoodScene({ active, soundEnabled, registerRef }: ChildhoodSceneProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 750);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <JourneySceneEngine
      active={active}
      chapterIndex={0}
      onRegister={registerRef}
      backgroundImage="/images/journey/rachmaninoff-childhood.webp"
      particles="leaves"
      overlayVariant="forest"
    >
      <div className="mx-auto flex min-h-[112vh] max-w-[1600px] items-end px-7 pb-24 pt-24 sm:px-12 lg:px-20 xl:px-24">
        <div className={`max-w-[640px] transition-all duration-[1500ms] ${revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[.3em] text-[#d2b16a]">
            <span>Глава I</span>
            <span className="h-px w-16 bg-[#d2b16a]/45" />
            <span>{soundEnabled ? "Звук активен" : "Без звука"}</span>
          </div>
          <p className="font-serif text-[clamp(5.6rem,12vw,10.5rem)] leading-[.78] tracking-[-.055em] text-[#e5cb8d] drop-shadow-[0_8px_30px_rgba(0,0,0,.45)]">1873</p>
          <p className="mt-8 text-[11px] uppercase tracking-[.38em] text-white/52">Новгородская губерния</p>
          <h3 className="mt-6 max-w-xl font-serif text-4xl leading-[1.02] text-[#f3ede2] sm:text-6xl lg:text-7xl">Детство среди русской природы</h3>
          <p className="mt-7 max-w-lg text-[15px] leading-7 text-white/64 sm:text-[17px] sm:leading-8">Ветер проходит сквозь берёзы, птицы звучат вдали, а первый музыкальный мир ещё не отделён от природы. Здесь начинается память, которая позднее станет частью его музыки.</p>
          <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[.2em] text-white/38">
            <span className="h-px w-14 bg-white/25" />
            Прокрутите вниз
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 text-[10px] uppercase tracking-[.2em] text-white/38 lg:flex">
        {["I", "II", "III", "IV", "V", "VI"].map((label, index) => (
          <div key={label} className="flex items-center gap-3">
            <span className={`h-px ${index === 0 ? "w-7 bg-[#caa65d]" : "w-4 bg-white/16"}`} />
            <span className={index === 0 ? "text-[#d9bd7c]" : "text-white/32"}>{label}</span>
          </div>
        ))}
      </div>
    </JourneySceneEngine>
  );
}
