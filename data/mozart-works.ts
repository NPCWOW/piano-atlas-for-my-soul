import type { Work } from "@/types/music";

export const mozartWorks: Work[] = [
  {
    id: "mozart-k331",
    slug: "mozart-piano-sonata-no-11-k331",
    passportNumber: "PA-1783-MOZ-0001",
    composerId: "wolfgang-amadeus-mozart",
    title: {
      ru: "Соната для фортепиано №11 ля мажор",
      en: "Piano Sonata No. 11 in A major",
    },
    subtitle: {
      ru: "С финалом Alla turca",
      en: "With the Alla turca finale",
    },
    catalogue: "K. 331 / 300i",
    opus: "K. 331",
    genre: { ru: "Соната", en: "Sonata" },
    era: "classical",
    year: "ок. 1783",
    composerAge: "27",
    place: { ru: "Вена / Зальцбург", en: "Vienna / Salzburg" },
    key: { ru: "ля мажор", en: "A major" },
    meter: "6/8 · 3/4 · 2/4",
    tempo: "Andante grazioso · Menuetto · Alla turca",
    duration: "20–24 минуты",
    difficulty: 7,
    formName: {
      ru: "Вариационный цикл · менуэт · рондо",
      en: "Variation cycle · minuet · rondo",
    },
    character: [
      { ru: "изящный", en: "graceful" },
      { ru: "театральный", en: "theatrical" },
      { ru: "игровой", en: "playful" },
      { ru: "контрастный", en: "contrasting" },
    ],
    palette: ["#efe4c7", "#a84732", "#1f4058", "#c59b4c"],
    facts: [
      { label: { ru: "Год", en: "Year" }, value: { ru: "ок. 1783", en: "c. 1783" } },
      { label: { ru: "Возраст автора", en: "Composer age" }, value: { ru: "27 лет", en: "27" } },
      { label: { ru: "Место", en: "Place" }, value: { ru: "Вена / Зальцбург", en: "Vienna / Salzburg" } },
      { label: { ru: "Тональность", en: "Key" }, value: { ru: "ля мажор", en: "A major" } },
      { label: { ru: "Части", en: "Movements" }, value: { ru: "3", en: "3" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "вариации · менуэт · рондо", en: "variations · minuet · rondo" } },
      { label: { ru: "Длительность", en: "Duration" }, value: { ru: "20–24 минуты", en: "20–24 minutes" } },
      { label: { ru: "Сложность", en: "Difficulty" }, value: { ru: "7 / 10", en: "7 / 10" } },
    ],
    storyTitle: {
      ru: "Соната, которая начинается без сонатного allegro.",
      en: "A sonata that begins without a sonata-allegro.",
    },
    story: [
      {
        ru: "Первая часть построена как тема с шестью вариациями. Вместо привычного драматического вступления Моцарт начинает с камерной, почти вокальной мелодии и показывает, как один образ может менять фактуру, регистр, движение и характер.",
        en: "The first movement is a theme with six variations. Instead of a conventional dramatic opening, Mozart begins with an intimate, almost vocal melody and shows how one idea can change texture, register, motion and character.",
      },
      {
        ru: "Финальное Rondo alla turca подражает модной в Европе музыке янычар. Резкие акценты, повторяющиеся ноты и маршевый ритм превращают фортепиано в маленький театральный оркестр.",
        en: "The final Rondo alla turca imitates the fashionable European image of Janissary music. Sharp accents, repeated notes and a marching pulse turn the piano into a miniature theatrical orchestra.",
      },
    ],
    composerQuote: {
      ru: "«Музыка не должна оскорблять слух, даже в самых ужасных положениях».",
      en: "“Music, even in situations of the greatest horror, should never be painful to the ear.”",
    },
    composerThoughts: {
      ru: "Главная сложность этой сонаты — не скорость, а прозрачность. Каждая фраза должна звучать естественно, орнаменты — быть частью мелодии, а контрасты — возникать без тяжести и грубого нажима.",
      en: "The central challenge is not speed but transparency. Every phrase should sound natural, ornaments should belong to the melody, and contrasts should emerge without heaviness or force.",
    },
    form: [
      {
        mark: "I",
        name: "Andante grazioso",
        bars: "тема и 6 вариаций",
        description: {
          ru: "Певучая тема проходит через шесть преобразований: от тонкой орнаментики до виртуозного движения и минорного затемнения.",
          en: "A singing theme passes through six transformations, from delicate ornamentation to virtuoso motion and a minor-mode shadow.",
        },
      },
      {
        mark: "II",
        name: "Menuetto",
        bars: "менуэт и трио",
        description: {
          ru: "Торжественный танец с плотными акцентами противопоставлен более мягкому и текучему трио.",
          en: "A formal dance with firm accents is contrasted with a softer, more fluid trio.",
        },
      },
      {
        mark: "III",
        name: "Alla turca",
        bars: "рондо",
        description: {
          ru: "Маршевая энергия, яркие регистровые контрасты и повторяющиеся ноты создают эффект сценического финала.",
          en: "March energy, bright registral contrasts and repeated notes create the effect of a theatrical finale.",
        },
      },
    ],
    challenges: [
      { name: { ru: "Артикуляция", en: "Articulation" }, level: { ru: "Очень высокая", en: "Very high" }, score: 90 },
      { name: { ru: "Орнаментика", en: "Ornamentation" }, level: { ru: "Высокая", en: "High" }, score: 84 },
      { name: { ru: "Ровность вариаций", en: "Variation control" }, level: { ru: "Высокая", en: "High" }, score: 82 },
      { name: { ru: "Классическая педаль", en: "Classical pedalling" }, level: { ru: "Средне-высокая", en: "Medium-high" }, score: 72 },
      { name: { ru: "Сценический характер", en: "Theatrical character" }, level: { ru: "Высокая", en: "High" }, score: 86 },
    ],
    performances: [
      {
        pianist: "Мицуко Утида",
        label: { ru: "Прозрачная классическая линия", en: "Transparent classical line" },
        note: {
          ru: "Тонкая артикуляция, естественные темпы и ясное различие характеров вариаций.",
          en: "Fine articulation, natural pacing and clear differentiation between the variations.",
        },
      },
      {
        pianist: "Мария Жуан Пиреш",
        label: { ru: "Камерная певучесть", en: "Intimate lyricism" },
        note: {
          ru: "Мягкое звукоизвлечение и ощущение свободной вокальной фразы.",
          en: "A gentle touch and a strong sense of freely sung phrasing.",
        },
      },
      {
        pianist: "Андраш Шифф",
        label: { ru: "Архитектурная ясность", en: "Architectural clarity" },
        note: {
          ru: "Ритмическая точность, суховатая педаль и чёткая форма без лишней романтизации.",
          en: "Rhythmic precision, restrained pedalling and lucid form without excess Romantic weight.",
        },
      },
    ],
    studyBefore: [
      { composer: "В. А. Моцарт", title: { ru: "Менуэт фа мажор, K. 5", en: "Minuet in F major, K. 5" } },
      { composer: "Й. Гайдн", title: { ru: "Соната до мажор, Hob. XVI:35", en: "Sonata in C major, Hob. XVI:35" } },
      { composer: "М. Клементи", title: { ru: "Сонатина до мажор, Op. 36 №1", en: "Sonatina in C major, Op. 36 No. 1" } },
    ],
    studyAfter: [
      { composer: "В. А. Моцарт", title: { ru: "Фантазия ре минор, K. 397", en: "Fantasia in D minor, K. 397" } },
      { composer: "В. А. Моцарт", title: { ru: "Соната до минор, K. 457", en: "Sonata in C minor, K. 457" } },
      { composer: "Л. ван Бетховен", title: { ru: "Соната соль мажор, Op. 49 №2", en: "Sonata in G major, Op. 49 No. 2" } },
    ],
    scoreSources: [
      {
        label: "IMSLP",
        url: "https://imslp.org/wiki/Piano_Sonata_No.11_in_A_major%2C_K.331%2F300i_(Mozart%2C_Wolfgang_Amadeus)",
        licenseNote: {
          ru: "Проверяйте статус конкретного издания и правила вашей юрисдикции перед скачиванием.",
          en: "Check the status of the specific edition and the rules in your jurisdiction before downloading.",
        },
      },
    ],
  },
];
