"use client";

import { useEffect, useRef, useState } from "react";

type SceneTransitionProps = {
  fromImage: string;
  toImage: string;
  label?: string;
};

export default function SceneTransition({ fromImage, toImage, label = "1885 · Москва" }: SceneTransitionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const root = section.closest<HTMLElement>("[data-journey-scroll='true']");
    if (!root) return;

    const update = () => {
      const rootRect = root.getBoundingClientRect();
      const rect = section.getBoundingClientRect();
      const distance = rootRect.bottom - rect.top;
      const total = rootRect.height + rect.height;
      setProgress(Math.max(0, Math.min(1, distance / total)));
    };

    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const fogOpacity = 1 - Math.abs(progress - 0.5) * 2;
  const labelOpacity = Math.max(0, 1 - Math.abs(progress - 0.52) * 5);

  return (
    <section ref={sectionRef} aria-hidden="true" className="relative h-[72vh] overflow-hidden bg-[#0a0907]">
      <div
        className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${fromImage})`,
          opacity: Math.max(0, 1 - progress * 1.35),
          transform: `scale(${1.04 + progress * 0.08}) translateY(${-progress * 20}px)`,
          filter: `blur(${progress * 8}px) saturate(${1 - progress * 0.35})`,
        }}
      />
      <div
        className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${toImage})`,
          opacity: Math.max(0, (progress - 0.22) * 1.5),
          transform: `scale(${1.13 - progress * 0.08}) translateY(${(1 - progress) * 20}px)`,
          filter: `blur(${Math.max(0, (0.55 - progress) * 12)}px) saturate(${0.72 + progress * 0.28})`,
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,.2),transparent_32%,rgba(5,4,3,.42)_100%)]" />
      <div
        className="absolute -left-[20%] top-[8%] h-[86%] w-[140%] bg-[radial-gradient(ellipse_at_center,rgba(229,222,203,.92)_0%,rgba(189,190,176,.48)_33%,transparent_69%)] blur-[44px]"
        style={{ opacity: fogOpacity * 0.92, transform: `translateX(${(progress - 0.5) * 9}%) scale(${0.9 + fogOpacity * 0.18})` }}
      />
      <div
        className="absolute -left-[8%] top-[30%] h-[38%] w-[116%] bg-[radial-gradient(ellipse_at_center,rgba(248,238,213,.62),transparent_66%)] blur-3xl"
        style={{ opacity: fogOpacity * 0.8, transform: `translateX(${(0.5 - progress) * 15}%)` }}
      />

      <div className="absolute inset-0 grid place-items-center text-center" style={{ opacity: labelOpacity }}>
        <div>
          <span className="mx-auto block h-px w-20 bg-[#c7a665]/55" />
          <p className="mt-5 text-[10px] uppercase tracking-[.42em] text-[#dcc58f]">{label}</p>
          <p className="mt-3 font-serif text-2xl text-white/72 sm:text-4xl">Из природы — в музыку</p>
        </div>
      </div>
    </section>
  );
}
