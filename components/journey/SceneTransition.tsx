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
      className="pointer-events-none relative z-30 h-0 overflow-visible"
    >
      <div className="absolute inset-x-[-14%] top-0 h-36 -translate-y-1/2 animate-[journeyMistBridge_18s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,rgba(226,220,205,.28)_0%,rgba(181,183,174,.13)_35%,rgba(121,126,117,.045)_58%,transparent_76%)] blur-[42px] mix-blend-screen" />
      <div className="absolute inset-x-[-8%] top-0 h-20 -translate-y-1/2 animate-[journeyMistBridgeSecondary_24s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,rgba(246,237,215,.17)_0%,rgba(209,205,193,.07)_42%,transparent_72%)] blur-3xl mix-blend-screen" />

      <style jsx>{`
        @keyframes journeyMistBridge {
          0%, 100% {
            transform: translate3d(-2.5%, -50%, 0) scale(1);
            opacity: .42;
          }
          50% {
            transform: translate3d(3.5%, -53%, 0) scale(1.08);
            opacity: .62;
          }
        }

        @keyframes journeyMistBridgeSecondary {
          0%, 100% {
            transform: translate3d(4%, -50%, 0) scale(.98);
            opacity: .3;
          }
          50% {
            transform: translate3d(-4%, -47%, 0) scale(1.08);
            opacity: .48;
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
