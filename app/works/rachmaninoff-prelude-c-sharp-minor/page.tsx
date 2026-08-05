import Link from "next/link";

const facts = [
  ["Год", "1892"],
  ["Возраст автора", "19 лет"],
  ["Место", "Москва"],
  ["Тональность", "до-диез минор"],
  ["Размер", "4/4"],
  ["Форма", "A–B–A′"],
  ["Длительность", "около 4–5 минут"],
  ["Сложность", "8 / 10"],
];

const form = [
  {
    mark: "A",
    name: "Lento",
    bars: "такты 1–13",
    text: "Колокольный трёхзвучный мотив и тяжёлые аккорды создают ощущение неизбежности. Главная задача — сохранить линию верхнего голоса внутри массивной фактуры.",
  },
  {
    mark: "B",
    name: "Agitato",
    bars: "такты 14–42",
    text: "Движение ускоряется, фактура становится непрерывной и напряжённой. Музыка постепенно накапливает энергию перед кульминационным возвращением темы.",
  },
  {
    mark: "A′",
    name: "Tempo primo",
    bars: "такты 45–61",
    text: "Исходная тема возвращается в грандиозном аккордовом изложении. Это не буквальная реприза, а преобразованный итог всей драматургии произведения.",
  },
];

const challenges = [
  ["Аккордовая техника", "Очень высокая", 94],
  ["Педализация", "Высокая", 84],
  ["Выделение мелодии", "Очень высокая", 92],
  ["Контроль кульминации", "Высокая", 88],
  ["Выносливость", "Средне-высокая", 72],
];

const performances = [
  ["Сергей Рахманинов", "Авторская запись", "Сдержанный темп, ясная архитектура и минимум лишней сентиментальности."],
  ["Святослав Рихтер", "Монументальная интерпретация", "Предельный динамический масштаб и ощущение огромного пространства."],
  ["Владимир Ашкенази", "Лирико-драматический подход", "Певучая линия и тщательно выстроенные переходы между разделами."],
];

export default function RachmaninoffPassportPage() {
  return (
    <main className="min-h-screen bg-[#f2eee6] text-[#171714]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f2eee6]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#a7864d] font-serif text-lg text-[#9d7b42]">LV</span>
            <span>
              <strong className="block font-serif text-lg font-medium">Piano Atlas</strong>
              <small className="block text-[10px] uppercase tracking-[0.24em] text-black/45">for my soul</small>
            </span>
          </Link>
          <Link href="/" className="rounded-full border border-black/15 px-4 py-2 text-sm transition hover:border-[#a7864d] hover:text-[#8c6934]">← На главную</Link>
        </div>
      </header>

      <section className="border-b border-black/10 px-5 py-14 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-[#9b7740]">Musical Passport · PA 1892 0032</p>
            <p className="mb-3 text-lg text-black/55">Сергей Рахманинов</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[.96] tracking-[-.04em] md:text-7xl lg:text-8xl">Прелюдия<br/><em className="font-normal text-[#8d6c38]">до-диез минор</em></h1>
            <p className="mt-6 font-serif text-2xl text-black/60">Op. 3 №2 · Morceaux de fantaisie</p>
          </div>

          <aside className="rounded-[2rem] border border-black/10 bg-[#1c2433] p-7 text-white shadow-2xl shadow-black/15">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Краткий портрет</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div><small className="text-white/45">ЭПОХА</small><strong className="mt-1 block font-serif text-xl">Поздний романтизм</strong></div>
              <div><small className="text-white/45">ХАРАКТЕР</small><strong className="mt-1 block font-serif text-xl">Драматический</strong></div>
              <div><small className="text-white/45">ЦВЕТ</small><div className="mt-3 flex gap-2"><i className="h-7 w-7 rounded-full bg-[#111827]"/><i className="h-7 w-7 rounded-full bg-[#3a2548]"/><i className="h-7 w-7 rounded-full bg-[#a7864d]"/></div></div>
              <div><small className="text-white/45">УРОВЕНЬ</small><strong className="mt-1 block font-serif text-xl">Продвинутый</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/10 md:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-[#faf7f0] p-5 md:p-7">
              <small className="text-[10px] font-semibold uppercase tracking-[.18em] text-black/40">{label}</small>
              <strong className="mt-2 block font-serif text-lg font-medium md:text-xl">{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">История создания</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Пьеса, которая стала судьбой.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-black/67">
            <p>Летом 1892 года Рахманинову было девятнадцать лет. Он только окончил Московскую консерваторию и находился в начале самостоятельной профессиональной жизни. Прелюдия вошла в цикл «Пьесы-фантазии» Op. 3 и вскоре стала произведением, которое публика требовала почти на каждом его концерте.</p>
            <p>Первое публичное исполнение состоялось в Москве осенью 1892 года. Мощный колокольный мотив, контраст между неподвижным вступлением и стремительным Agitato, а затем грандиозное возвращение темы сделали пьесу мгновенно узнаваемой.</p>
            <p className="rounded-2xl border-l-2 border-[#a7864d] bg-white/55 p-6 font-serif text-2xl leading-relaxed text-black/80">«Музыка пришла ко мне настолько настойчиво, что я должен был её записать».</p>
          </div>
        </div>
      </section>

      <section className="bg-[#1c2433] px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d3b276]">Музыкальный анализ</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">Крупная трёхчастная форма A–B–A′</h2>
            <p className="max-w-md text-white/55">Форма строится как путь от сдержанной угрозы через нарастающее возбуждение к монументальному возвращению исходного образа.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {form.map((part) => (
              <article key={part.mark} className="rounded-[1.6rem] border border-white/10 bg-white/[.045] p-7">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl text-[#d3b276]">{part.mark}</span>
                  <small className="rounded-full border border-white/15 px-3 py-1 text-white/45">{part.bars}</small>
                </div>
                <h3 className="mt-7 font-serif text-2xl">{part.name}</h3>
                <p className="mt-4 leading-7 text-white/58">{part.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">Исполнительские задачи</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Что требует особого внимания.</h2>
            <div className="mt-10 space-y-7">
              {challenges.map(([title, level, value]) => (
                <div key={title as string}>
                  <div className="mb-2 flex justify-between gap-4"><strong>{title}</strong><span className="text-sm text-black/45">{level}</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#a7864d]" style={{ width: `${value}%` }}/></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#ded4c2] p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#795b2c]">Что думал автор</p>
            <blockquote className="mt-6 font-serif text-3xl leading-snug md:text-4xl">Рахманинов ценил ясность формы и не любил, когда исполнители заменяли внутреннюю логику произведения чрезмерной сентиментальностью.</blockquote>
            <p className="mt-8 leading-7 text-black/60">Популярность прелюдии со временем стала для него обременительной: публика постоянно требовала её исполнения. Тем не менее именно эта пьеса принесла молодому композитору широкую известность.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#faf7f0] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9b7740]">Знаковые исполнения</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Три разных взгляда.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {performances.map(([pianist, label, note], index) => (
              <article key={pianist} className="rounded-[1.6rem] border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                <span className="text-sm text-[#9b7740]">0{index + 1}</span>
                <h3 className="mt-8 font-serif text-2xl">{pianist}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[.12em] text-black/40">{label}</p>
                <p className="mt-5 leading-7 text-black/60">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="rounded-[2rem] border border-black/10 p-8">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9b7740]">Изучить до</p>
            <h3 className="mt-3 font-serif text-3xl">Подготовительный маршрут</h3>
            <ul className="mt-7 space-y-4 text-black/65"><li>Бах — Инвенция №1, BWV 772</li><li>Шопен — Прелюдия ми минор, Op. 28 №4</li><li>Чайковский — Октябрь. Осенняя песнь</li></ul>
          </article>
          <article className="rounded-[2rem] bg-[#a7864d] p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-white/65">Изучить после</p>
            <h3 className="mt-3 font-serif text-3xl">Следующий уровень</h3>
            <ul className="mt-7 space-y-4 text-white/75"><li>Рахманинов — Прелюдия соль минор, Op. 23 №5</li><li>Рахманинов — Музыкальный момент №4</li><li>Рахманинов — Этюд-картина Op. 39</li></ul>
          </article>
        </div>
      </section>

      <footer className="border-t border-black/10 px-5 py-10 text-center md:px-10">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-[#a7864d] font-serif text-[#9d7b42]">LV</div>
        <p className="font-serif text-lg">Piano Atlas for my soul</p>
        <small className="mt-2 block text-black/40">By Lygin Ilya for Lygina Valeriya.</small>
      </footer>
    </main>
  );
}
