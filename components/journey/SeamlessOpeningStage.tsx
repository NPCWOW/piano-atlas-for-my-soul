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

const stageDust = Array.from({ length: 30 }, (_, index) => ({
  left: `${4 + ((index * 37) % 92)}%`,
  top: `${8 + ((index * 43) % 82)}%`,
  delay: `${-(index % 15) * 1.1}s`,
  duration: `${9 + (index % 9) * 1.45}s`,
  size: 1 + (index % 5) * 0.8,
  drift: -22 + ((index * 19) % 44),
  opacity: 0.12 + (index % 6) * 0.065,
}));

export default function SeamlessOpeningStage({ soundEnabled, registerChapter }: SeamlessOpeningStageProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const thirdMarkerRef = useRef<HTMLDivElement | null>(null);
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
    registerChapter(2, thirdMarkerRef.current);
    return () => registerChapter(2, null);
  }, [registerChapter]);

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

  const forestExit = smoothstep(0.14, 0.38, progress);
  const conservatoryIn = smoothstep(0.12, 0.39, progress);
  const conservatoryOut = smoothstep(0.58, 0.82, progress);
  const portraitIn = smoothstep(0.58, 0.86, progress);

  const forestTextExit = smoothstep(0.07, 0.23, progress);
  const conservatoryTextIn = smoothstep(0.34, 0.46, progress);
  const conservatoryTextOut = smoothstep(0.56, 0.7, progress);
  const portraitTextIn = smoothstep(0.76, 0.9, progress);

  const firstTransition = clamp((progress - 0.11) / 0.3);
  const firstLightPulse = Math.sin(Math.PI * firstTransition);
  const firstReveal = 4 + conservatoryIn * 120;
  const firstMaskInner = Math.max(0, firstReveal - 24);
  const firstMaskOuter = Math.min(148, firstReveal + 25);

  const secondTransition = clamp((progress - 0.57) / 0.31);
  const secondLightPulse = Math.sin(Math.PI * secondTransition);
  const portraitReveal = 3 + portraitIn * 124;
  const portraitMaskInner = Math.max(0, portraitReveal - 20);
  const portraitMaskOuter = Math.min(150, portraitReveal + 28);

  const conservatoryTextOpacity = conservatoryTextIn * (1 - conservatoryTextOut);
  const conservatoryLayerOpacity = Math.min(1, conservatoryIn * 1.16) * (1 - conservatoryOut * 0.92);

  const movePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section ref={trackRef} className="seamless-opening-stage relative h-[420vh] bg-[#090806]">
      <div
        ref={registerFirst}
        data-chapter-index="0"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[140vh]"
      />
      <div
        ref={registerSecond}
        data-chapter-index="1"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[140vh] h-[140vh]"
      />
      <div
        ref={thirdMarkerRef}
        data-chapter-index="2"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[280vh] h-[140vh]"
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
            opacity: 1 - forestExit * 0.94,
            filter: `blur(${forestExit * 4}px) saturate(${1 - forestExit * 0.28}) brightness(${1 - forestExit * 0.2})`,
            transform: `translate3d(${pointer.x * -7}px, ${pointer.y * -4 - progress * 15}px, 0) scale(${1.035 + Math.min(progress, 0.4) * 0.22})`,
            transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
          }}
        />

        <div
          className="absolute inset-[-6%] will-change-transform"
          style={{
            backgroundImage: "url('/images/journey/rachmaninoff-conservatory.png')",
            backgroundPosition: "center 46%",
            backgroundSize: "cover",
            opacity: conservatoryLayerOpacity,
            filter: `blur(${conservatoryOut * 2.6}px) saturate(${0.82 + conservatoryIn * 0.18 - conservatoryOut * 0.18}) brightness(${0.9 + conservatoryIn * 0.1 - conservatoryOut * 0.14})`,
            transformOrigin: "80% 58%",
            transform: `translate3d(${pointer.x * -4 - conservatoryOut * 7}px, ${pointer.y * -2 + (1 - conservatoryIn) * 16 + conservatoryOut * 8}px, 0) scale(${1.13 - conservatoryIn * 0.1 + conservatoryOut * 0.58})`,
            WebkitMaskImage: `radial-gradient(circle at 31% 38%, #000 0%, #000 ${firstMaskInner}%, rgba(0,0,0,.92) ${firstReveal}%, transparent ${firstMaskOuter}%)`,
            maskImage: `radial-gradient(circle at 31% 38%, #000 0%, #000 ${firstMaskInner}%, rgba(0,0,0,.92) ${firstReveal}%, transparent ${firstMaskOuter}%)`,
            transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
          }}
        />

        <div
          className="absolute inset-[-5%] will-change-transform"
          style={{
            backgroundImage: "url('/images/works/rachmaninoff-hero.jpg')",
            backgroundPosition: "68% 45%",
            backgroundSize: "cover",
            opacity: portraitIn,
            filter: `sepia(${0.08 + portraitIn * 0.1}) grayscale(${0.22 - portraitIn * 0.12}) contrast(${1.03 + portraitIn * 0.04}) brightness(${0.82 + portraitIn * 0.12})`,
            transform: `translate3d(${pointer.x * -4}px, ${pointer.y * -2 + (1 - portraitIn) * 18}px, 0) scale(${1.18 - portraitIn * 0.12})`,
            WebkitMaskImage: `radial-gradient(circle at 80% 57%, #000 0%, #000 ${portraitMaskInner}%, rgba(0,0,0,.94) ${portraitReveal}%, transparent ${portraitMaskOuter}%)`,
            maskImage: `radial-gradient(circle at 80% 57%, #000 0%, #000 ${portraitMaskInner}%, rgba(0,0,0,.94) ${portraitReveal}%, transparent ${portraitMaskOuter}%)`,
            transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
          }}
        />

        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: firstLightPulse * 0.82,
            background:
              "radial-gradient(circle at 31% 38%,rgba(255,246,218,.94) 0%,rgba(255,224,169,.46) 19%,rgba(245,215,165,.16) 38%,transparent 64%)",
            filter: `blur(${10 + firstLightPulse * 12}px)`,
          }}
        />

        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: secondLightPulse * 0.94,
            background:
              "radial-gradient(circle at 80% 57%,rgba(255,244,210,.98) 0%,rgba(224,176,91,.52) 15%,rgba(175,115,46,.2) 34%,transparent 61%)",
            filter: `blur(${8 + secondLightPulse * 18}px)`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            opacity: portraitIn * 0.72,
            background:
              "repeating-linear-gradient(180deg,transparent 0px,transparent 34px,rgba(229,205,151,.1) 35px,transparent 36px)",
            WebkitMaskImage: "linear-gradient(90deg,#000 0%,transparent 44%,transparent 100%)",
            maskImage: "linear-gradient(90deg,#000 0%,transparent 44%,transparent 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg,rgba(3,3,2,${0.84 - conservatoryIn * 0.2 + portraitIn * 0.12}) 0%,rgba(4,4,3,${0.48 - conservatoryIn * 0.11 + portraitIn * 0.08}) 30%,transparent 60%,rgba(3,2,2,${0.42 + portraitIn * 0.12}) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/38" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,.7)]" />

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden [perspective:700px]"
          style={{ opacity: 1 - smoothstep(0.12, 0.3, progress) }}
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
          style={{ opacity: smoothstep(0.3, 0.45, progress) * (1 - smoothstep(0.63, 0.82, progress)) }}
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
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ opacity: smoothstep(0.67, 0.88, progress) }}
        >
          {stageDust.map((particle, index) => (
            <span
              key={index}
              className="absolute animate-[seamlessStageDust_ease-in-out_infinite] rounded-full bg-[#e7c57d] shadow-[0_0_14px_rgba(223,181,99,.46)]"
              style={
                {
                  left: particle.left,
                  top: particle.top,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                  "--stage-drift": `${particle.drift}px`,
                } as CSSProperties
              }
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
            opacity: conservatoryTextOpacity,
            transform: `translate3d(${conservatoryTextOut * -35}px,${(1 - conservatoryTextIn) * 46 - conservatoryTextOut * 18}px,0) scale(${0.97 + conservatoryTextIn * 0.03 - conservatoryTextOut * 0.025})`,
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

        <div
          className="absolute inset-0 flex items-end px-7 pb-20 pt-24 sm:px-12 lg:px-20 xl:px-24"
          style={{
            opacity: portraitTextIn,
            transform: `translate3d(0,${(1 - portraitTextIn) * 52}px,0) scale(${0.965 + portraitTextIn * 0.035})`,
          }}
        >
          <div className="max-w-[670px]">
            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[.3em] text-[#d9b86f]">
              <span>Глава III</span>
              <span className="h-px w-16 bg-[#d2b16a]/45" />
              <span>{soundEnabled ? "Музыка раскрывается полностью" : "Без звука"}</span>
            </div>
            <p className="font-serif text-[clamp(5.3rem,11.5vw,10rem)] leading-[.78] tracking-[-.055em] text-[#e5c984] drop-shadow-[0_8px_30px_rgba(0,0,0,.52)]">1892</p>
            <p className="mt-8 text-[11px] uppercase tracking-[.38em] text-white/58">Москва · Первый большой успех</p>
            <h3 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">Первый собственный голос</h3>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/70 sm:text-[17px] sm:leading-8">После окончания Московской консерватории музыка впервые раскрывается полноценно. Прелюдия до-диез минор становится произведением, с которым публика запоминает его имя.</p>
            <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-[.2em] text-[#dbc17f]/72">
              <span className="h-px w-14 bg-[#d4b36b]/55" />
              Op. 3 · Прелюдия до-диез минор
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[9px] uppercase tracking-[.28em] text-white/42"
          style={{ opacity: 1 - smoothstep(0.88, 0.98, progress) }}
        >
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
          @keyframes seamlessStageDust {
            0%,100% { transform: translate3d(0,16px,0) scale(.7); opacity: .06; }
            45% { transform: translate3d(calc(var(--stage-drift) * .55),-20px,0) scale(1.08); opacity: .52; }
            75% { transform: translate3d(var(--stage-drift),-42px,0) scale(.88); opacity: .18; }
          }
          @media (prefers-reduced-motion: reduce) {
            span, svg { animation: none !important; }
          }
        `}</style>

        <style jsx global>{`
          .seamless-opening-stage + section article:first-child {
            display: none !important;
          }
        `}</style>
      </div>
    </section>
  );
}
