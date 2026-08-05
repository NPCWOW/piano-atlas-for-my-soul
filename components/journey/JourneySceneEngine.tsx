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

type LeafParticle = {
  left: string;
  delay: string;
  duration: string;
  size: number;
  drift: number;
  opacity: number;
  blur: number;
  startRotation: number;
  spin: number;
  flutterDuration: number;
};

const leafPalettes = [
  { light: "#e0c87d", middle: "#a78235", dark: "#5d4318", vein: "#5f451b" },
  { light: "#cdb267", middle: "#89712d", dark: "#473b18", vein: "#4e3c18" },
  { light: "#bca65e", middle: "#756229", dark: "#3f381b", vein: "#453719" },
  { light: "#d9ba63", middle: "#9a6e26", dark: "#553514", vein: "#5f3d16" },
  { light: "#ac9954", middle: "#6d5d25", dark: "#383116", vein: "#403418" },
];

const leaves: LeafParticle[] = Array.from({ length: 34 }, (_, index) => {
  const depth = index % 6;
  const sizes = [11, 13, 16, 20, 27, 38];
  const blurs = [0.15, 0.1, 0.05, 0, 0.35, 1.15];

  return {
    left: `${2 + ((index * 19) % 96)}%`,
    delay: `${-(index % 13) * 1.65}s`,
    duration: `${13 + (index % 7) * 1.9}s`,
    size: sizes[depth],
    drift: -95 + ((index * 37) % 190),
    opacity: 0.28 + depth * 0.1,
    blur: blurs[depth],
    startRotation: (index * 47) % 360,
    spin: 540 + (index % 5) * 170,
    flutterDuration: 1.65 + (index % 5) * 0.34,
  };
});

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

      <div className="pointer-events-none absolute inset-0 overflow-hidden [perspective:700px]">
        {leaves.map((leaf, index) => {
          const palette = leafPalettes[index % leafPalettes.length];
          const gradientId = `birch-leaf-gradient-${chapterIndex}-${index}`;

          return (
            <span
              key={index}
              className="absolute -top-16 animate-[journeyLeafFall_linear_infinite] will-change-transform"
              style={
                {
                  left: leaf.left,
                  width: `${leaf.size}px`,
                  height: `${leaf.size * 0.78}px`,
                  opacity: leaf.opacity,
                  filter: `blur(${leaf.blur}px) drop-shadow(0 ${Math.max(1, leaf.size * 0.08)}px ${Math.max(
                    1,
                    leaf.size * 0.12,
                  )}px rgba(0,0,0,.28))`,
                  animationDelay: leaf.delay,
                  animationDuration: leaf.duration,
                  "--leaf-drift": `${leaf.drift}px`,
                  "--leaf-opacity": leaf.opacity,
                  "--leaf-start-rotation": `${leaf.startRotation}deg`,
                  "--leaf-spin": `${leaf.spin}deg`,
                } as CSSProperties
              }
            >
              <svg
                viewBox="0 0 44 34"
                className="h-full w-full animate-[journeyLeafFlutter_ease-in-out_infinite] overflow-visible"
                style={{ animationDuration: `${leaf.flutterDuration}s` }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradientId} x1="7" y1="3" x2="37" y2="31" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={palette.light} />
                    <stop offset="0.48" stopColor={palette.middle} />
                    <stop offset="1" stopColor={palette.dark} />
                  </linearGradient>
                </defs>

                <path
                  d="M2.8 17.2C5.4 12.7 7.2 8.4 12.1 5.7L15.1 6.3L17.8 3.4L20.5 5.1L23.1 2.8L25.7 5.2L29.2 4.9L31 8L34.7 8.8L34.1 11.7L39.5 15.3L37.1 18.2L40.1 21.2L35.4 22.6L34 26.1L29.8 25.8L26.7 29.2L22.8 27.8L19.4 30.8L16.9 27.3L12.4 27.6L10.9 23.7L6.8 22.6L7.1 19.5Z"
                  fill={`url(#${gradientId})`}
                />

                <path
                  d="M4.6 17.9C13.1 17.1 22.1 16.5 37.2 16.1"
                  fill="none"
                  stroke={palette.vein}
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  opacity=".82"
                />
                <path
                  d="M13.4 17.1L10.1 11.6M17.3 16.8L15.1 8.2M21.3 16.6L20.4 6.1M25.1 16.4L27.6 7.2M29.1 16.3L33 10.7M12.8 18L10.4 23.1M17 17.6L15.6 25.2M21.2 17.2L21.2 27.2M25.4 17L27.7 25.8M29.2 16.8L33.1 22.4"
                  fill="none"
                  stroke={palette.vein}
                  strokeWidth=".62"
                  strokeLinecap="round"
                  opacity=".58"
                />
                <path
                  d="M2.8 17.7C1.5 18.3.7 19.1 0 20"
                  fill="none"
                  stroke={palette.vein}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M7 10.7C12 5.4 20.4 3.5 28.9 5.4"
                  fill="none"
                  stroke="rgba(255,244,192,.28)"
                  strokeWidth=".75"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-[8%] left-[-15%] h-[30%] w-[130%] animate-[journeyMist_18s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,rgba(218,220,203,.15),transparent_64%)] blur-3xl" />
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes journeyLeafFall {
          0% {
            transform: translate3d(0, -14vh, 0) rotateZ(var(--leaf-start-rotation)) scale(.84);
            opacity: 0;
          }
          8% {
            opacity: var(--leaf-opacity);
          }
          30% {
            transform: translate3d(calc(var(--leaf-drift) * .18), 29vh, 0)
              rotateZ(calc(var(--leaf-start-rotation) + 130deg)) scale(.95);
          }
          58% {
            transform: translate3d(calc(var(--leaf-drift) * .68), 67vh, 0)
              rotateZ(calc(var(--leaf-start-rotation) + 330deg)) scale(1.04);
          }
          82% {
            opacity: var(--leaf-opacity);
          }
          100% {
            transform: translate3d(var(--leaf-drift), 122vh, 0)
              rotateZ(calc(var(--leaf-start-rotation) + var(--leaf-spin))) scale(.9);
            opacity: 0;
          }
        }

        @keyframes journeyLeafFlutter {
          0%, 100% {
            transform: rotateX(18deg) rotateY(-34deg) rotateZ(-7deg) skewX(-2deg);
          }
          22% {
            transform: rotateX(-31deg) rotateY(18deg) rotateZ(10deg) skewX(3deg);
          }
          49% {
            transform: rotateX(28deg) rotateY(47deg) rotateZ(-5deg) skewX(-3deg);
          }
          73% {
            transform: rotateX(-16deg) rotateY(-52deg) rotateZ(8deg) skewX(2deg);
          }
        }

        @keyframes journeyMist {
          0%, 100% {
            transform: translate3d(-2%, 0, 0) scale(1);
            opacity: .45;
          }
          50% {
            transform: translate3d(4%, -2%, 0) scale(1.08);
            opacity: .78;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          span,
          svg {
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
