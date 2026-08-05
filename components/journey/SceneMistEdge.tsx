"use client";

type SceneMistEdgeProps = {
  position: "top" | "bottom";
};

export default function SceneMistEdge({ position }: SceneMistEdgeProps) {
  const isBottom = position === "bottom";
  const mask = isBottom
    ? "linear-gradient(to bottom, transparent 0%, #000 20%, #000 78%, transparent 100%)"
    : "linear-gradient(to bottom, transparent 0%, #000 22%, #000 80%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 h-64 overflow-hidden ${
        isBottom ? "bottom-0" : "top-0"
      }`}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      <div
        className={`absolute left-[-10%] h-48 w-[120%] animate-[sceneMistDriftA_17s_ease-in-out_infinite] blur-[30px] ${
          isBottom ? "bottom-[-3rem]" : "top-[-3rem]"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 14% 54%, rgba(232,229,218,.46) 0%, rgba(202,202,192,.19) 34%, transparent 67%), radial-gradient(ellipse at 48% 62%, rgba(242,237,221,.38) 0%, rgba(199,200,190,.17) 38%, transparent 70%), radial-gradient(ellipse at 82% 48%, rgba(222,222,213,.40) 0%, rgba(183,187,180,.15) 34%, transparent 68%)",
        }}
      />

      <div
        className={`absolute left-[-8%] h-36 w-[116%] animate-[sceneMistDriftB_23s_ease-in-out_infinite] blur-[22px] ${
          isBottom ? "bottom-[-1.5rem]" : "top-[-1.5rem]"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 28% 52%, rgba(248,238,213,.28) 0%, rgba(224,217,199,.10) 43%, transparent 72%), radial-gradient(ellipse at 69% 48%, rgba(239,232,215,.25) 0%, rgba(209,207,196,.09) 42%, transparent 72%)",
        }}
      />

      <div
        className={`absolute left-[8%] h-24 w-[84%] animate-[sceneMistBreath_12s_ease-in-out_infinite] rounded-[50%] bg-white/[.055] blur-[34px] backdrop-blur-[2px] ${
          isBottom ? "bottom-4" : "top-4"
        }`}
      />

      <style jsx>{`
        @keyframes sceneMistDriftA {
          0%, 100% {
            transform: translate3d(-3%, 0, 0) scale(1);
            opacity: .72;
          }
          50% {
            transform: translate3d(4%, -4px, 0) scale(1.08);
            opacity: .94;
          }
        }

        @keyframes sceneMistDriftB {
          0%, 100% {
            transform: translate3d(4%, 3px, 0) scale(.96);
            opacity: .55;
          }
          50% {
            transform: translate3d(-5%, -5px, 0) scale(1.1);
            opacity: .8;
          }
        }

        @keyframes sceneMistBreath {
          0%, 100% {
            transform: scaleX(.94) scaleY(.88);
            opacity: .38;
          }
          50% {
            transform: scaleX(1.08) scaleY(1.05);
            opacity: .65;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
