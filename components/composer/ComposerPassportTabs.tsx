"use client";

import Link from "next/link";
import { useState } from "react";
import type { Work } from "@/types/music";

type TabKey = "overview" | "works" | "journey" | "archive";

type ComposerPassportTabsProps = {
  works: Work[];
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Обзор" },
  { key: "works", label: "Произведения" },
  { key: "journey", label: "Жизнь в музыке" },
  { key: "archive", label: "Архив" },
];

export default function ComposerPassportTabs({ works }: ComposerPassportTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("works");

  return (
    <div id="composer-works" className="mt-7 scroll-mt-6">
      <div className="overflow-x-auto border-b border-black/10">
        <div className="flex min-w-max gap-8 px-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`pb-4 text-[11px] uppercase tracking-[.08em] transition ${
                activeTab === tab.key
                  ? "border-b-2 border-[#a67d35] text-[#8b6324]"
                  : "text-black/48 hover:text-black/72"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <section className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-2xl border border-black/10 bg-white/60 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#9b7130]">Портрет композитора</p>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
              Последний великий романтик и один из крупнейших пианистов своей эпохи.
            </h2>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-black/68 sm:text-base">
              В музыке Рахманинова соединяются широкая певучая мелодия, колокольность, сложная фортепианная фактура и исключительное чувство большого драматического дыхания.
            </p>
          </article>

          <article className="rounded-2xl border border-black/10 bg-[#1a2433] p-7 text-[#eee7da] shadow-sm">
            <p className="text-xs uppercase tracking-[.14em] text-[#d0ad69]">Музыкальный почерк</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["певучесть", "колокольность", "монументальность", "ностальгия", "виртуозность", "широкая форма"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/[.05] px-4 py-2 text-xs text-white/70">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-8 font-serif text-2xl leading-snug text-white/85">
              «Музыка должна идти от сердца и быть обращена к сердцу».
            </p>
          </article>
        </section>
      )}

      {activeTab === "works" && (
        <section className="mt-5 grid gap-5 xl:grid-cols-2">
          {works.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.slug}`}
              className="group relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#fffdf8] shadow-[0_18px_50px_rgba(65,48,20,.08)] transition duration-500 hover:-translate-y-1 hover:border-[#a67d35]/35 hover:shadow-[0_24px_65px_rgba(65,48,20,.13)]"
            >
              <div className="relative min-h-[260px] overflow-hidden bg-[#ded5c8]">
                <div
                  className="absolute inset-0 bg-cover bg-[68%_42%] grayscale transition duration-700 group-hover:scale-[1.035]"
                  style={{ backgroundImage: "url('/images/works/rachmaninoff-hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,237,226,.98)_0%,rgba(244,237,226,.92)_37%,rgba(244,237,226,.18)_70%,rgba(10,9,8,.18)_100%)]" />
                <div className="relative z-10 max-w-[64%] p-7 sm:p-9">
                  <p className="text-[10px] uppercase tracking-[.2em] text-[#9b7130]">Musical Passport · {work.passportNumber}</p>
                  <h3 className="mt-7 font-serif text-3xl leading-[.98] tracking-[-.025em] sm:text-4xl">{work.title.ru}</h3>
                  <p className="mt-4 font-serif text-xl text-[#735426]">{work.opus}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-black/10 sm:grid-cols-4">
                {[
                  ["Год", work.year],
                  ["Тональность", work.key.ru],
                  ["Длительность", work.duration],
                  ["Сложность", `${work.difficulty} / 10`],
                ].map(([label, value]) => (
                  <div key={label} className="min-h-20 border-b border-r border-black/10 p-4 sm:border-b-0">
                    <small className="block text-[9px] uppercase tracking-[.1em] text-black/40">{label}</small>
                    <strong className="mt-2 block font-serif font-medium text-[#684c22]">{value}</strong>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-7 py-5 text-xs uppercase tracking-[.12em] text-[#8b6324]">
                <span>Открыть паспорт произведения</span>
                <span className="text-lg transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}

          {works.length === 0 && (
            <div className="rounded-2xl border border-dashed border-black/15 bg-white/45 p-10 text-center text-sm text-black/50">
              Произведения этого композитора пока не добавлены.
            </div>
          )}
        </section>
      )}

      {activeTab === "journey" && (
        <section className="mt-5 overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#10100e] text-[#eee4cf] shadow-xl">
          <div className="relative min-h-[360px] p-8 sm:p-12">
            <div className="absolute inset-0 bg-[url('/images/journey/rachmaninoff-childhood.webp')] bg-cover bg-center opacity-45" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,.98)_0%,rgba(7,7,6,.78)_48%,rgba(7,7,6,.18)_100%)]" />
            <div className="relative z-10 max-w-xl">
              <p className="text-[10px] uppercase tracking-[.28em] text-[#d1ad68]">Composer Journey</p>
              <h2 className="mt-7 font-serif text-4xl leading-tight sm:text-5xl">Жизнь Рахманинова как единая музыкальная сцена.</h2>
              <p className="mt-6 text-sm leading-7 text-white/62 sm:text-base">
                Нажмите на портрет композитора в верхней части паспорта. Откроется бесшовное путешествие от детства среди русской природы до последних лет.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === "archive" && (
        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Фотографии", "Портреты, концертные снимки и семейный архив"],
            ["Рукописи", "Черновики, авторские пометки и первые издания"],
            ["Записи", "Авторское исполнение и исторические интерпретации"],
          ].map(([title, description], index) => (
            <article key={title} className="rounded-2xl border border-black/10 bg-white/55 p-6">
              <span className="font-serif text-4xl text-[#b38a45]">0{index + 1}</span>
              <h3 className="mt-7 font-serif text-2xl">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-black/58">{description}</p>
              <p className="mt-8 text-[10px] uppercase tracking-[.14em] text-black/35">Раздел пополняется</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
