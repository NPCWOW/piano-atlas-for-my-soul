"use client";

type SceneTransitionProps = {
  fromImage: string;
  toImage: string;
  label?: string;
};

export default function SceneTransition(_props: SceneTransitionProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-40 h-0 overflow-visible">
      <div
        className="absolute inset-x-0 top-[-145px] h-[290px] overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_3%,rgba(211,211,202,.06)_28%,rgba(228,224,212,.13)_49%,rgba(202,202,194,.07)_70%,transparent_97%)] backdrop-blur-[1px]" />

        <div
          className="absolute -left-[8%] top-[48px] h-[180px] w-[116%] animate-[mistBankA_18s_ease-in-out_infinite] blur-[30px]"
          style={{
            background:
              "radial-gradient(34% 45% at 4% 62%, rgba(229,227,217,.26) 0%, rgba(203,204,196,.10) 42%, transparent 72%), radial-gradient(29% 38% at 27% 39%, rgba(239,234,220,.22) 0%, rgba(205,205,196,.08) 44%, transparent 73%), radial-gradient(36% 48% at 54% 63%, rgba(224,224,216,.25) 0%, rgba(194,198,192,.09) 43%, transparent 73%), radial-gradient(30% 39% at 78% 36%, rgba(239,233,217,.20) 0%, rgba(203,202,193,.08) 42%, transparent 72%), radial-gradient(27% 43% at 101% 61%, rgba(222,222,214,.22) 0%, rgba(190,195,190,.08) 45%, transparent 74%)",
          }}
        />

        <div
          className="absolute -left-[12%] top-[88px] h-[125px] w-[124%] animate-[mistBankB_24s_ease-in-out_infinite] blur-[22px]"
          style={{
            background:
              "radial-gradient(24% 42% at 12% 48%, rgba(244,237,218,.16) 0%, transparent 70%), radial-gradient(32% 44% at 42% 58%, rgba(223,222,213,.18) 0%, transparent 72%), radial-gradient(26% 40% at 69% 43%, rgba(241,234,217,.14) 0%, transparent 70%), radial-gradient(29% 46% at 93% 56%, rgba(218,219,211,.16) 0%, transparent 72%)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes mistBankA {
          0%, 100% {
            transform: translate3d(-2.5%, 3px, 0) scale(1);
            opacity: .62;
          }
          50% {
            transform: translate3d(3.5%, -4px, 0) scale(1.04);
            opacity: .78;
          }
        }

        @keyframes mistBankB {
          0%, 100% {
            transform: translate3d(3%, -2px, 0) scale(.98);
            opacity: .46;
          }
          50% {
            transform: translate3d(-4%, 4px, 0) scale(1.05);
            opacity: .64;
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
