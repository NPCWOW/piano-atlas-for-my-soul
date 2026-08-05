"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComposerJourneyLink() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const openJourney = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      router.push("/journeys/sergei-rachmaninoff");
    }, 760);
  };

  return (
    <>
      <button
        type="button"
        onClick={openJourney}
        aria-label="Открыть путешествие по жизни Сергея Рахманинова"
        className="absolute inset-y-0 right-0 z-[15] w-[54%] cursor-zoom-in rounded-r-[1.7rem] outline-none focus-visible:ring-2 focus-visible:ring-[#a67d35]"
      >
        <span className="absolute bottom-11 right-8 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[.18em] text-white/90 opacity-0 shadow-lg backdrop-blur transition duration-300 hover:opacity-100 sm:block">
          Нажмите на портрет · Жизнь в музыке
        </span>
      </button>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[100] bg-[#0a0907] transition-opacity duration-700 ${
          opening ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[url('/images/works/rachmaninoff-hero.jpg')] bg-cover bg-center grayscale transition-transform duration-700 ease-out ${
            opening ? "scale-125 opacity-70" : "scale-100 opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black/45" />
        <p
          className={`absolute inset-x-0 bottom-[12%] text-center font-serif text-2xl tracking-[.16em] text-[#d6bd86] transition-all delay-200 duration-500 ${
            opening ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          A LIFE IN MUSIC
        </p>
      </div>
    </>
  );
}
