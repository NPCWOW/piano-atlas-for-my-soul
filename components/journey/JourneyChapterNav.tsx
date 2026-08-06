"use client";

type JourneyChapterNavProps = {
  chapters: Array<{ year: string; title: string }>;
  activeIndex: number;
  onSelect: (index: number) => void;
};

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function JourneyChapterNav({ chapters, activeIndex, onSelect }: JourneyChapterNavProps) {
  return (
    <nav
      aria-label="Навигация по главам"
      className="fixed right-5 top-1/2 z-[100015] hidden -translate-y-1/2 flex-col items-end gap-2 lg:flex"
    >
      {chapters.map((chapter, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={`${chapter.year}-${chapter.title}`}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Перейти к главе ${roman[index]}: ${chapter.title}`}
            aria-current={active ? "step" : undefined}
            className="group flex h-10 items-center justify-end gap-3 outline-none"
          >
            <span
              className={`pointer-events-none max-w-0 translate-x-2 overflow-hidden whitespace-nowrap rounded-full border px-0 py-1.5 text-[9px] uppercase tracking-[.16em] opacity-0 backdrop-blur-md transition-all duration-500 group-hover:max-w-[250px] group-hover:translate-x-0 group-hover:px-3 group-hover:opacity-100 group-focus-visible:max-w-[250px] group-focus-visible:translate-x-0 group-focus-visible:px-3 group-focus-visible:opacity-100 ${
                active
                  ? "border-[#c8a760]/45 bg-black/55 text-[#e4ca8c]"
                  : "border-white/15 bg-black/40 text-white/58"
              }`}
            >
              {chapter.year} · {chapter.title}
            </span>

            <span
              className={`h-px transition-all duration-500 ${
                active ? "w-9 bg-[#d4b36b] shadow-[0_0_14px_rgba(211,177,103,.48)]" : "w-4 bg-white/25 group-hover:w-7 group-hover:bg-white/55"
              }`}
            />

            <span
              className={`w-7 text-left font-serif text-[12px] tracking-[.12em] transition duration-500 ${
                active ? "scale-110 text-[#e0c27d]" : "text-white/38 group-hover:text-white/78"
              }`}
            >
              {roman[index]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
