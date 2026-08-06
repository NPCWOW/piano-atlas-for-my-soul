"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

type SeamlessOpeningStageProps = {
  soundEnabled: boolean;
  registerChapter: (index: number, element: HTMLElement | null) => void;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const smoothstep = (start: number, end: number, value: number) => {
  const amount = clamp((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
};

const leaves = Array.from({ length: 22 }, (_, index) => ({
  left: `${2 + ((index * 23) % 96)}%`,
  delay: `${-(index % 11) * 1.7}s`,
  duration: `${14 + (index % 6) * 2.1}s`,
  size: 10 + (index % 5) * 5,
  drift: -90 + ((index * 41) % 180),
  opacity: 0.25 + (index % 5) * 0.09,
  rotation: (index * 53) % 360,
}));

const dust = Array.from({ length: 34 }, (_, index) => ({
  left: `${3 + ((index * 29) % 94)}%`,
  top: `${5 + ((index * 31) % 86)}%`,
  delay: `${-(index % 13) * 1.25}s`,
  duration: `${11 + (index % 8) * 1.8}s`,
  size: 1 + (index % 4) * 0.7,
  opacity: 0.16 + (index % 5) * 0.07,
}));

export default function SeamlessOpeningStage({ soundEnabled, registerChapter }: SeamlessOpeningStageProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const registerFirst = useCallback(
    (element: HTMLDivElement | null) => registerChapter(0, element),
    [registerChapter],
  );
  const registerSecond = useCallback(
    (element: HTMLDivElement | null) => registerChapter(1, element),
    [registerChapter],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const root = track.closest<HTMLElement>("[data-journey-scroll='true']");
    if (!root) return;

    const update = () => {
      frameRef.current = null;
      const rootRect = root.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const travel = Math.max(1, track.offsetHeight - root.clientHeight);
      setProgress(clamp((rootRect.top - trackRect.top) / travel));
    };

    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    root.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      root.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const forestExit = smoothstep(0.27, 0.64, progress);
  const conservatoryIn = smoothstep(0.23, 0.68, progress);
  const forestTextExit = smoothstep(0.15, 0.38, progress);
  const conservatoryTextIn = smoothstep(0.59, 0.79, progress);
  const transitionAmount = clamp((progress - 0.23) / 0.47);
  const lightPulse = Math.sin(Math.PI * transitionAmount);
  const reveal = 5 + conservatoryIn * 118;
  const maskInner = Math.max(0, reveal - 24);
  const maskMiddle = reveal;
  const maskOuter = Math.min(145, reveal + 25);

  const movePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section ref={trackRef} className="relative h-[270vh] bg-[#090806]">
      <div
        ref={registerFirst}
        data-chapter-index="0"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[135vh]"
      />
      <div
        ref={registerSecond}
        data-chapter-index="1"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[135vh] h-[135vh]"
      />

      <div
        onPointerMove={movePointer}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
        className="sticky top-0 h-screen overflow-hidden bg-[#090806] text-[#f3ede2]"
      >
        <div
          className="absolute inset-[-4%] will-change-transform"
          style={{
            backgroundImage: "url('/images/journey/rachmaninoff-childhood.webp')",
            backgroundPosition: "center 78%",
            backgroundSize: "cover",
            opacity: 1 - forestExit * 0.78,
            filter: `blur(${forestExit * 3.2}px) saturate(${1 - forestExit * 0.24}) brightness(${1 - forestExit * 0.16})`,
            transform: `translate3d(${pointer.x * -7}px, ${pointer.y * -4 - progress * 18}px, 0) scale(${1.035 + progress * 0.135})`,
            transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
          }}
        />

        <div
          className="absolute inset-[-5%] will-change-transform"
          style={{
            backgroundImage: "url('/images/journey/rachmaninoff-conservatory.png')",
            backgroundPosition: "center 46%",
            backgroundSize: "cover",
            opacity: Math.min(1, conservatoryIn * 1.16),
            filter: `saturate(${0.82 + conservatoryIn * 0.18}) brightness(${0.9 + conservatoryIn * 0.1})`,
            transform: `translate3d(${pointer.x * -4}px, ${pointer.y * -2 + (1 - conservatoryIn) * 16}px, 0) scale(${1.13 - conservatoryIn * 0.1})`,
            WebkitMaskImage: `radial-gradient(circle at 31% 38%, #000 0%, #000 ${maskInner}%, rgba(0,0,0,.9) ${maskMiddle}%, transparent ${maskOuter}%)`,
            maskImage: `radial-gradient(circle at 31% 38%, #000 0%, #000 ${maskInner}%, rgba(0,0,0,.9) ${maskMiddle}%, transparent ${maskOuter}%)`,
            transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
          }}
        />

        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: lightPulse * 0.82,
            background:
              "radial-gradient(circle at 31% 38%,rgba(255,246,218,.94) 0%,rgba(255,224,169,.46) 19%,rgba(245,215,165,.16) 38%,transparent 64%)",
            filter: `blur(${10 + lightPulse * 12}px)`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg,rgba(3,3,2,${0.84 - conservatoryIn * 0.22}) 0%,rgba(4,4,3,${0.48 - conservatoryIn * 0.12}) 30%,transparent 60%,rgba(3,2,2,.42) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,.68)]" />

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden [perspective:700px]"
          style={{ opacity: 1 - smoothstep(0.2, 0.52, progress) }}
        >
          {leaves.map((leaf, index) => (
            <span
              key={index}
              className="absolute -top-14 animate-[seamlessLeafFall_linear_infinite] will-change-transform"
              style={
                {
                  left: leaf.left,
                  width: `${leaf.size}px`,
                  height: `${leaf.size * 0.72}px`,
                  opacity: leaf.opacity,
                  animationDelay: leaf.delay,
                  animationDuration: leaf.duration,
                  "--leaf-drift": `${leaf.drift}px`,
                  "--leaf-rotation": `${leaf.rotation}deg`,
                } as CSSProperties
              }
            >
              <svg viewBox="0 0 44 34" className="h-full w-full animate-[seamlessLeafFlutter_2.6s_ease-in-out_infinite]">
                <path
                  d="M2.8 17.2C5.4 12.7 7.2 8.4 12.1 5.7L15.1 6.3L17.8 3.4L20.5 5.1L23.1 2.8L25.7 5.2L29.2 4.9L31 8L34.7 8.8L34.1 11.7L39.5 15.3L37.1 18.2L40.1 21.2L35.4 22.6L34 26.1L29.8 25.8L26.7 29.2L22.8 27.8L19.4 30.8L16.9 27.3L12.4 27.6L10.9 23.7L6.8 22.6L7.1 19.5Z"
                  fill={index % 3 === 0 ? "#b58a35" : index % 3 === 1 ? "#8c7430" : "#c39d48"}
                />
                <path d="M4.6 17.9C13.1 17.1 22.1 16.5 37.2 16.1" fill="none" stroke="#4c3817" strokeWidth="1" opacity=".72" />
              </svg>
            </span>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ opacity: smoothstep(0.48, 0.76, progress) }}
        >
          {dust.map((particle, index) => (
            <span
              key={index}
              className="absolute animate-[seamlessDustFloat_ease-in-out_infinite] rounded-full bg-[#f1d39a] shadow-[0_0_12px_rgba(255,225,166,.52)]"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 flex items-end px-7 pb-20 pt-24 sm:px-12 lg:px-20 xl:px-24"
          style={{
            opacity: 1 - forestTextExit,
            transform: `translate3d(0,${-forestTextExit * 38}px,0) scale(${1 - forestTextExit * 0.035})`,
          }}
        >
          <div className="max-w-[640px]">
            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[.3em] text-[#d2b16a]">
              <span>Глава I</span>
              <span className="h-px w-16 bg-[#d2b16a]/45" />
              <span>{soundEnabled ? "Звук активен" : "Без звука"}</span>
            </div>
            <p className="font-serif text-[clamp(5.6rem,12vw,10.5rem)] leading-[.78] tracking-[-.055em] text-[#e5cb8d] drop-shadow-[0_8px_30px_rgba(0,0,0,.45)]">1873</p>
            <p className="mt-8 text-[11px] uppercase tracking-[.38em] text-white/52">Новгородская губерния</p>
            <h3 className="mt-6 max-w-xl font-serif text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">Детство среди русской природы</h3>
            <p className="mt-7 max-w-lg text-[15px] leading-7 text-white/68 sm:text-[17px] sm:leading-8">Ветер проходит сквозь берёзы, птицы звучат вдали, а первый музыкальный мир ещё не отделён от природы. Здесь начинается память, которая позднее станет частью его музыки.</p>
          </div>
        </div>

        <div
          className="absolute inset-0 flex items-end justify-end px-7 pb-20 pt-24 sm:px-12 lg:px-20 xl:px-24"
          style={{
            opacity: conservatoryTextIn,
            transform: `translate3d(0,${(1 - conservatoryTextIn) * 46}px,0) scale(${0.97 + conservatoryTextIn * 0.03})`,
          }}
        >
          <div className="max-w-[660px] text-left">
            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[.3em] text-[#d2b16a]">
              <span>Глава II</span>
              <span className="h-px w-16 bg-[#d2b16a]/45" />
              <span>{soundEnabled ? "Шаги · ноты · рояль" : "Без звука"}</span>
            </div>
            <p className="font-serif text-[clamp(5.2rem,11vw,9.6rem)] leading-[.8] tracking-[-.055em] text-[#e2c887] drop-shadow-[0_8px_30px_rgba(0,0,0,.5)]">1885</p>
            <p className="mt-8 text-[11px] uppercase tracking-[.38em] text-white/58">Москва · Консерватория</p>
            <h3 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">Первые уроки и консерватория</h3>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/70 sm:text-[17px] sm:leading-8">Шаги гулко звучат по коридору, страницы нот шуршат в тишине, а первые фразы за роялем постепенно складываются в собственный музыкальный язык.</p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[9px] uppercase tracking-[.28em] text-white/42">
          <span className="block">Прокрутите вниз</span>
          <span className="mx-auto mt-3 block h-8 w-px bg-gradient-to-b from-[#d2b16a]/70 to-transparent" />
        </div>

        <style jsx>{`
          @keyframes seamlessLeafFall {
            0% { transform: translate3d(0,-14vh,0) rotateZ(var(--leaf-rotation)); opacity: 0; }
            9% { opacity: .75; }
            54% { transform: translate3d(calc(var(--leaf-drift) * .62),62vh,0) rotateZ(calc(var(--leaf-rotation) + 310deg)); }
            100% { transform: translate3d(var(--leaf-drift),116vh,0) rotateZ(calc(var(--leaf-rotation) + 670deg)); opacity: 0; }
          }
          @keyframes seamlessLeafFlutter {
            0%,100% { transform: rotateX(20deg) rotateY(-34deg) rotateZ(-6deg); }
            50% { transform: rotateX(-27deg) rotateY(43deg) rotateZ(9deg); }
          }
          @keyframes seamlessDustFloat {
            0%,100% { transform: translate3d(0,12px,0) scale(.72); opacity: .08; }
            50% { transform: translate3d(15px,-28px,0) scale(1.08); opacity: .58; }
          }
          @media (prefers-reduced-motion: reduce) {
            span, svg { animation: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
