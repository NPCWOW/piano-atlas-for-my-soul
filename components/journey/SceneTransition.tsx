"use client";

type SceneTransitionProps = {
  fromImage: string;
  toImage: string;
  fromPosition?: string;
  toPosition?: string;
  label?: string;
};

const mistTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='360' viewBox='0 0 900 360'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.006 .022' numOctaves='4' seed='17' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 .24 0 1 0 0 .24 0 0 1 0 .22 0 0 0 .72 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.78'/%3E%3C/svg%3E\")";

export default function SceneTransition({
  fromImage,
  toImage,
  fromPosition = "center 78%",
  toPosition = "center 18%",
}: SceneTransitionProps) {
  return (
    <section
      aria-hidden="true"
      className="pointer-events-none relative z-40 -my-[22vh] h-[44vh] overflow-hidden"
    >
      <div
        className="absolute inset-[-8%] bg-cover will-change-transform"
        style={{
          backgroundImage: `url(${fromImage})`,
          backgroundPosition: fromPosition,
          opacity: 0.78,
          transform: "scale(1.08)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 35%, rgba(0,0,0,.82) 53%, transparent 92%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 35%, rgba(0,0,0,.82) 53%, transparent 92%)",
        }}
      />

      <div
        className="absolute inset-[-8%] bg-cover will-change-transform"
        style={{
          backgroundImage: `url(${toImage})`,
          backgroundPosition: toPosition,
          opacity: 0.82,
          transform: "scale(1.08)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 7%, rgba(0,0,0,.72) 43%, #000 67%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 7%, rgba(0,0,0,.72) 43%, #000 67%, #000 100%)",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,6,.10)_0%,rgba(204,201,188,.10)_42%,rgba(219,211,193,.12)_52%,rgba(28,22,16,.10)_100%)] backdrop-blur-[1.5px]" />

      <div
        className="absolute -inset-x-[12%] inset-y-[7%] animate-[journeyTextureMistA_19s_ease-in-out_infinite] bg-repeat opacity-[.24] blur-[9px] mix-blend-screen"
        style={{
          backgroundImage: mistTexture,
          backgroundSize: "900px 360px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 21%, #000 78%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 21%, #000 78%, transparent 100%)",
        }}
      />

      <div
        className="absolute -inset-x-[10%] inset-y-[18%] animate-[journeyTextureMistB_27s_ease-in-out_infinite] bg-repeat opacity-[.14] blur-[15px] mix-blend-screen"
        style={{
          backgroundImage: mistTexture,
          backgroundPosition: "310px 70px",
          backgroundSize: "720px 300px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 24%, #000 74%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 24%, #000 74%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[.035] blur-sm" />

      <style jsx>{`
        @keyframes journeyTextureMistA {
          0%, 100% {
            transform: translate3d(-3%, 2%, 0) scale(1.04);
            opacity: .18;
          }
          50% {
            transform: translate3d(4%, -3%, 0) scale(1.1);
            opacity: .3;
          }
        }

        @keyframes journeyTextureMistB {
          0%, 100% {
            transform: translate3d(4%, -2%, 0) scale(1.08);
            opacity: .1;
          }
          50% {
            transform: translate3d(-5%, 3%, 0) scale(1.14);
            opacity: .2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
