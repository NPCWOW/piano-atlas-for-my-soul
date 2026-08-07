import Link from "next/link";

const items = [
  { label: "Атлас", href: "/atlas" },
  { label: "Произведения", href: "/works" },
  { label: "Композиторы", href: "/composers" },
  { label: "Хронология", href: "/timeline" },
  { label: "Библиотека", href: "/#library" },
  { label: "Коллекции", href: "/#collections" },
];

export default function PrimaryNav({ active }: { active?: string }) {
  return (
    <header className="relative z-50 flex h-[62px] items-center border-b border-black/10 bg-[#fbf8f2]/95 px-5 backdrop-blur md:px-7">
      <Link href="/" className="mr-8 font-serif text-[28px] leading-none text-[#9b7130] md:mr-14">
        LV
      </Link>
      <nav className="hidden flex-1 items-center justify-center gap-7 text-[11px] text-black/62 md:flex lg:gap-10">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`transition hover:text-[#9b7130] ${active === item.label ? "font-semibold text-[#8c6424]" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4 text-lg text-black/65">
        <button type="button" aria-label="Поиск" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5">
          ⌕
        </button>
        <button type="button" aria-label="Меню" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5">
          ≡
        </button>
      </div>
    </header>
  );
}
