"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type JourneySceneEngineProps = {
  children: ReactNode;
  backgroundImage: string;
  className?: string;
  active?: boolean;
  onRegister?: (element: HTMLElement | null) => void;
  chapterIndex?: number;
};

const leaves = Array.from({ length: 24 }, (_, index) => ({
  left: `${4 + ((index * 17) % 92)}%`,
  delay: `${-(index % 9) * 1.8}s`,
  duration: `${11 + (index % 6) * 2.3}s`,
  size: 7 + (index % 5) * 3,
  drift: -45 + (index % 8) * 16,
  opacity: 0.25 + (index % 5) * 0.11,
}));

export default function JourneySceneEngine({
  children,
  backgroundImage,
  className = "",
  active = false,
  onRegister,
  chapterIndex = 0,
}: JourneySceneEngineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onRegister?.(sectionRef.current);
    return () => onRegister?.(null);
  }, [onRegister]);

  const move = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      data-chapter-index={chapterIndex}
      onPointerMove={move}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      className={`relative min-h-[112vh] overflow-hidden bg-[#090906] text-[#f1eadc] ${className}`}
    >
      <div
        className="absolute inset-[-4%] will-change-transform"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          transform: `translate3d(${pointer.x * -7}px, ${pointer.y * -4}px, 0) scale(${active ? 1.085 : 1.035})`,
          transition: "transform 10s cubic-bezier(.2,.75,.2,1)",
        }}
      />

      <div
        className="absolute inset-[-3%] opacity-55 mix-blend-screen will-change-transform"
        style={{
          transform: `translate3d(${pointer.x * -14}px, ${pointer.y * -8}px, 0)`,
          background:
            "linear-gradient(116deg, transparent 12%, rgba(250,224,164,.12) 28%, transparent 46%), radial-gradient(ellipse at 28% 22%, rgba(255,230,170,.16), transparent 34%)",
          transition: "transform 1.2s ease-out",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,3,.9)_0%,rgba(5,5,4,.55)_26%,transparent_54%,rgba(5,5,4,.18)_77%,rgba(3,3,2,.68)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.22)_0%,transparent_34%,rgba(0,0,0,.12)_62%,rgba(0,0,0,.82)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_170px_rgba(0,0,0,.76)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {leaves.map((leaf, index) => (
          <span
            key={index}
            className="absolute -top-10 rounded-[70%_18%_72%_24%] bg-[#b89a4c] blur-[.25px] animate-[journeyLeafFall_linear_infinite]"
            style={
              {
                left: leaf.left,
                width: `${leaf.size}px`,
                height: `${Math.max(5, leaf.size * 0.62)}px`,
                opacity: leaf.opacity,
                animationDelay: leaf.delay,
                animationDuration: leaf.duration,
                "--leaf-drift": `${leaf.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-[8%] left-[-15%] h-[30%] w-[130%] animate-[journeyMist_18s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,rgba(218,220,203,.15),transparent_64%)] blur-3xl" />
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes journeyLeafFall {
          0% { transform: translate3d(0,-12vh,0) rotate(0deg); opacity: 0; }
          9% { opacity: var(--leaf-opacity, .55); }
          72% { opacity: .55; }
          100% { transform: translate3d(var(--leaf-drift),118vh,0) rotate(630deg); opacity: 0; }
        }
        @keyframes journeyMist {
          0%, 100% { transform: translate3d(-2%,0,0) scale(1); opacity: .45; }
          50% { transform: translate3d(4%,-2%,0) scale(1.08); opacity: .78; }
        }
      `}</style>
    </section>
  );
}
