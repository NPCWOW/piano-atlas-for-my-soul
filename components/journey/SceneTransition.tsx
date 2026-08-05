"use client";

type SceneTransitionProps = {
  fromImage: string;
  toImage: string;
  label?: string;
};

export default function SceneTransition({ fromImage, toImage, label }: SceneTransitionProps) {
  return (
    <section
      aria-hidden="true"
      data-from-image={fromImage}
      data-to-image={toImage}
      data-label={label}
      className="pointer-events-none relative z-30 -my-24 h-48 overflow-hidden"
    >
      <div className="absolute inset-x-[-12%] top-1/2 h-44 -translate-y-1/2 animate-[journeyMistBridge_16s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,rgba(231,226,211,.55)_0%,rgba(195,196,184,.28)_34%,rgba(121,126,117,.10)_58%,transparent_76%)] blur-[34px]" />
      <div className="absolute inset-x-[-8%] top-1/2 h-24 -translate-y-1/2 animate-[journeyMistBridgeSecondary_21s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,rgba(247,239,218,.28)_0%,rgba(213,210,196,.13)_42%,transparent_72%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(211,209,196,.06)_28%,rgba(226,221,207,.13)_50%,rgba(196,194,182,.07)_72%,transparent_100%)]" />

      <style jsx>{`
        @keyframes journeyMistBridge {
          0%, 100% {
            transform: translate3d(-3%, -50%, 0) scale(1);
            opacity: .68;
          }
          50% {
            transform: translate3d(4%, -53%, 0) scale(1.08);
            opacity: .86;
          }
        }

        @keyframes journeyMistBridgeSecondary {
          0%, 100% {
            transform: translate3d(4%, -50%, 0) scale(.96);
            opacity: .5;
          }
          50% {
            transform: translate3d(-5%, -47%, 0) scale(1.1);
            opacity: .72;
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
