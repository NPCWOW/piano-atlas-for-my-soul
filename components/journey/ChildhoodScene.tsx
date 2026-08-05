"use client";

import { useEffect, useRef, useState } from "react";

type ChildhoodSceneProps = {
  active: boolean;
  soundEnabled: boolean;
  registerRef: (element: HTMLElement | null) => void;
};

const trunks = [
  { left: "4%", width: 18, height: "90%", delay: "0s", opacity: 0.55 },
  { left: "13%", width: 26, height: "100%", delay: "-2s", opacity: 0.78 },
  { left: "27%", width: 16, height: "84%", delay: "-4s", opacity: 0.5 },
  { left: "42%", width: 30, height: "106%", delay: "-1s", opacity: 0.88 },
  { left: "59%", width: 20, height: "91%", delay: "-5s", opacity: 0.62 },
  { left: "72%", width: 34, height: "108%", delay: "-3s", opacity: 0.92 },
  { left: "87%", width: 18, height: "88%", delay: "-6s", opacity: 0.58 },
];

const leaves = Array.from({ length: 14 }, (_, index) => ({
  left: `${8 + ((index * 13) % 86)}%`,
  top: `${5 + ((index * 17) % 65)}%`,
  delay: `${-(index % 7) * 1.9}s`,
  duration: `${9 + (index % 5) * 2}s`,
  rotate: `${index * 37}deg`,
}));

export default function ChildhoodScene({ active, soundEnabled, registerRef }: ChildhoodSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    registerRef(sectionRef.current);
    return () => registerRef(null);
  }, [registerRef]);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 900);
    return () => window.clearTimeout(timer);
  }, [active]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section
      ref={sectionRef}
      data-chapter-index={0}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setMouse({ x: 0, y: 0 })}
      className="relative min-h-[115vh] overflow-hidden bg-[#0b0d0a] text-[#f1eadc]"
    >
      <div
        className="absolute inset-[-5%] transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouse.x * -5}px, ${mouse.y * -3}px, 0) scale(1.04)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_17%,rgba(245,225,173,.32),transparent_22%),linear-gradient(180deg,#253027_0%,#111812_52%,#080a08_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(180deg,transparent,rgba(3,5,3,.88)),radial-gradient(ellipse_at_50%_100%,rgba(117,103,64,.18),transparent_60%)]" />
      </div>

      <div
        className="absolute inset-[-4%] opacity-45 blur-[2px] transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouse.x * -10}px, ${mouse.y * -6}px, 0)` }}
      >
        {trunks.slice(0, 4).map((trunk, index) => (
          <span
            key={`rear-${index}`}
            className="absolute bottom-0 rounded-[50%_45%_30%_35%] bg-[linear-gradient(90deg,#c8c0aa_0%,#f0eadc_44%,#8f8a7b_49%,#ece5d5_58%,#b7af9b_100%)] shadow-[inset_-5px_0_12px_rgba(42,37,30,.35)]"
            style={{ left: trunk.left, width: trunk.width, height: trunk.height, opacity: trunk.opacity * 0.6 }}
          />
        ))}
      </div>

      <div
        className="absolute inset-[-5%] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${mouse.x * -16}px, ${mouse.y * -9}px, 0)` }}
      >
        {trunks.map((trunk, index) => (
          <span
            key={index}
            className="absolute bottom-[-4%] origin-bottom animate-[sway_8s_ease-in-out_infinite] rounded-[46%_52%_30%_35%] bg-[linear-gradient(90deg,#aaa28f_0%,#eee8d9_40%,#7e796e_46%,#f3ecdd_56%,#b7af9b_100%)] shadow-[inset_-8px_0_14px_rgba(34,30,24,.32),0_20px_35px_rgba(0,0,0,.24)]"
            style={{
              left: trunk.left,
              width: trunk.width,
              height: trunk.height,
              opacity: trunk.opacity,
              animationDelay: trunk.delay,
            }}
          >
            <i className="absolute left-[20%] top-[20%] h-2 w-[52%] -rotate-6 rounded-full bg-black/35" />
            <i className="absolute right-[5%] top-[42%] h-1.5 w-[44%] rotate-3 rounded-full bg-black/30" />
            <i className="absolute left-[8%] top-[67%] h-2 w-[48%] -rotate-3 rounded-full bg-black/30" />
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {leaves.map((leaf, index) => (
          <span
            key={index}
            className="absolute h-3 w-5 rounded-[70%_20%_70%_20%] bg-[#b39a59]/65 blur-[.2px] animate-[leafFall_linear_infinite]"
            style={{
              left: leaf.left,
              top: leaf.top,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              transform: `rotate(${leaf.rotate})`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_18%,rgba(249,226,163,.13)_36%,transparent_49%)] opacity-70 mix-blend-screen" />
      <div className="absolute inset-x-0 bottom-[8%] h-[34%] bg-[radial-gradient(ellipse_at_50%_70%,rgba(200,205,184,.16),transparent_68%)] blur-2xl animate-[mist_12s_ease-in-out_infinite]" />

      <div
        className={`absolute left-[71%] top-[54%] h-24 w-9 origin-bottom rounded-t-full bg-black/55 blur-[.4px] transition-all duration-[1600ms] ${
          active ? "translate-x-0 opacity-45" : "translate-x-10 opacity-0"
        }`}
        aria-hidden="true"
      >
        <span className="absolute -left-1 -top-5 h-8 w-8 rounded-full bg-black/70" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[115vh] max-w-7xl items-end px-7 pb-24 pt-28 sm:px-12 lg:px-20">
        <div
          className={`max-w-2xl transition-all duration-[1400ms] ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[.28em] text-[#d5b875]">
            <span>Глава I</span>
            <span className="h-px w-16 bg-[#d5b875]/40" />
            <span>{soundEnabled ? "Звук активен" : "Без звука"}</span>
          </div>
          <p className="font-serif text-[clamp(5rem,15vw,11rem)] leading-[.8] tracking-[-.06em] text-[#e7d3a0]">1873</p>
          <p className="mt-8 text-xs uppercase tracking-[.34em] text-white/48">Новгородская губерния</p>
          <h3 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Детство среди русской природы</h3>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/62 sm:text-lg">
            Ветер проходит сквозь берёзы, птицы звучат вдали, а первый музыкальный мир ещё не отделён от природы. Здесь начинается память, которая позднее станет частью его музыки.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-0.45deg); }
          50% { transform: rotate(0.55deg); }
        }
        @keyframes leafFall {
          0% { transform: translate3d(0,-12vh,0) rotate(0deg); opacity: 0; }
          12% { opacity: .75; }
          75% { opacity: .55; }
          100% { transform: translate3d(55px,105vh,0) rotate(520deg); opacity: 0; }
        }
        @keyframes mist {
          0%, 100% { transform: translateX(-2%) scale(1); opacity: .55; }
          50% { transform: translateX(3%) scale(1.05); opacity: .82; }
        }
      `}</style>
    </section>
  );
}
