import type { Work } from "@/types/music";

export const works: Work[] = [
  {
    id: "rachmaninoff-op3-no2",
    slug: "rachmaninoff-prelude-c-sharp-minor",
    passportNumber: "PA-1892-RACH-0001",
    composerId: "sergei-rachmaninoff",
    title: {
      ru: "Прелюдия до-диез минор",
      en: "Prelude in C-sharp minor",
    },
    subtitle: {
      ru: "Из цикла «Пьесы-фантазии»",
      en: "From Morceaux de fantaisie",
    },
    opus: "Op. 3 №2",
    genre: { ru: "Прелюдия", en: "Prelude" },
    era: "romantic",
    year: "1892",
    composerAge: "19",
    place: { ru: "Москва", en: "Moscow" },
    key: { ru: "до-диез минор", en: "C-sharp minor" },
    meter: "4/4",
    tempo: "Lento · Agitato · Tempo primo",
    duration: "4–5 минут",
    difficulty: 8,
    formName: {
      ru: "Крупная трёхчастная форма A–B–A′",
      en: "Large ternary form A–B–A′",
    },
    character: [
      { ru: "драматический", en: "dramatic" },
      { ru: "колокольный", en: "bell-like" },
      { ru: "монументальный", en: "monumental" },
    ],
    palette: ["#111827", "#3a2548", "#a7864d"],
    facts: [
      { label: { ru: "Год", en: "Year" }, value: { ru: "1892", en: "1892" } },
      { label: { ru: "Возраст автора", en: "Composer age" }, value: { ru: "19 лет", en: "19" } },
      { label: { ru: "Место", en: "Place" }, value: { ru: "Москва", en: "Moscow" } },
      { label: { ru: "Тональность", en: "Key" }, value: { ru: "до-диез минор", en: "C-sharp minor" } },
      { label: { ru: "Размер", en: "Meter" }, value: { ru: "4/4", en: "4/4" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "A–B–A′", en: "A–B–A′" } },
      { label: { ru: "Длительность", en: "Duration" }, value: { ru: "около 4–5 минут", en: "about 4–5 minutes" } },
      { label: { ru: "Сложность", en: "Difficulty" }, value: { ru: "8 / 10", en: "8 / 10" } },
    ],
    storyTitle: {
      ru: "Пьеса, которая стала судьбой.",
      en: "The piece that became a destiny.",
    },
    story: [
      {
        ru: "Летом 1892 года Рахманинову было девятнадцать лет. Он только окончил Московскую консерваторию и находился в начале самостоятельной профессиональной жизни. Прелюдия вошла в цикл «Пьесы-фантазии» Op. 3 и вскоре стала произведением, которое публика требовала почти на каждом его концерте.",
        en: "In the summer of 1892 Rachmaninoff was nineteen. He had just graduated from the Moscow Conservatory and was beginning his independent professional life. The prelude became part of Morceaux de fantaisie, Op. 3, and soon turned into the piece audiences demanded at almost every concert.",
      },
      {
        ru: "Первое публичное исполнение состоялось в Москве осенью 1892 года. Мощный колокольный мотив, контраст между неподвижным вступлением и стремительным Agitato, а затем грандиозное возвращение темы сделали пьесу мгновенно узнаваемой.",
        en: "The first public performance took place in Moscow in the autumn of 1892. Its tolling motif, the contrast between the still opening and the rushing Agitato, and the monumental return of the theme made it instantly recognizable.",
      },
    ],
    composerQuote: {
      ru: "«Музыка пришла ко мне настолько настойчиво, что я должен был её записать».",
      en: "“The music came to me so insistently that I had to write it down.”",
    },
    composerThoughts: {
      ru: "Рахманинов ценил ясность формы и не любил, когда исполнители заменяли внутреннюю логику произведения чрезмерной сентиментальностью. Популярность прелюдии со временем стала для него обременительной: публика постоянно требовала её исполнения.",
      en: "Rachmaninoff valued clarity of form and disliked excessive sentimentality that obscured a work’s inner logic. The prelude’s popularity eventually became burdensome because audiences constantly demanded it.",
    },
    form: [
      {
        mark: "A",
        name: "Lento",
        bars: "такты 1–13",
        description: {
          ru: "Колокольный трёхзвучный мотив и тяжёлые аккорды создают ощущение неизбежности. Главная задача — сохранить линию верхнего голоса внутри массивной фактуры.",
          en: "A tolling three-note motif and heavy chords create a sense of inevitability. The main challenge is to preserve the upper melodic line inside the massive texture.",
        },
      },
      {
        mark: "B",
        name: "Agitato",
        bars: "такты 14–42",
        description: {
          ru: "Движение ускоряется, фактура становится непрерывной и напряжённой. Музыка постепенно накапливает энергию перед кульминационным возвращением темы.",
          en: "The motion accelerates and the texture becomes continuous and tense, gradually accumulating energy before the climactic return.",
        },
      },
      {
        mark: "A′",
        name: "Tempo primo",
        bars: "такты 45–61",
        description: {
          ru: "Исходная тема возвращается в грандиозном аккордовом изложении. Это не буквальная реприза, а преобразованный итог всей драматургии произведения.",
          en: "The opening theme returns in a monumental chordal texture. It is not a literal reprise, but the transformed outcome of the work’s entire drama.",
        },
      },
    ],
    challenges: [
      { name: { ru: "Аккордовая техника", en: "Chord technique" }, level: { ru: "Очень высокая", en: "Very high" }, score: 94 },
      { name: { ru: "Педализация", en: "Pedalling" }, level: { ru: "Высокая", en: "High" }, score: 84 },
      { name: { ru: "Выделение мелодии", en: "Voicing" }, level: { ru: "Очень высокая", en: "Very high" }, score: 92 },
      { name: { ru: "Контроль кульминации", en: "Climax control" }, level: { ru: "Высокая", en: "High" }, score: 88 },
      { name: { ru: "Выносливость", en: "Endurance" }, level: { ru: "Средне-высокая", en: "Medium-high" }, score: 72 },
    ],
    performances: [
      {
        pianist: "Сергей Рахманинов",
        label: { ru: "Авторская запись", en: "Composer recording" },
        note: {
          ru: "Сдержанный темп, ясная архитектура и минимум лишней сентиментальности.",
          en: "A restrained tempo, lucid architecture and very little excess sentimentality.",
        },
      },
      {
        pianist: "Святослав Рихтер",
        label: { ru: "Монументальная интерпретация", en: "Monumental interpretation" },
        note: {
          ru: "Предельный динамический масштаб и ощущение огромного пространства.",
          en: "An enormous dynamic scale and a striking sense of space.",
        },
      },
      {
        pianist: "Владимир Ашкенази",
        label: { ru: "Лирико-драматический подход", en: "Lyric-dramatic approach" },
        note: {
          ru: "Певучая линия и тщательно выстроенные переходы между разделами.",
          en: "A singing melodic line and carefully shaped transitions between sections.",
        },
      },
    ],
    studyBefore: [
      { composer: "И. С. Бах", title: { ru: "Инвенция №1, BWV 772", en: "Invention No. 1, BWV 772" } },
      { composer: "Ф. Шопен", title: { ru: "Прелюдия ми минор, Op. 28 №4", en: "Prelude in E minor, Op. 28 No. 4" } },
      { composer: "П. Чайковский", title: { ru: "Октябрь. Осенняя песнь", en: "October: Autumn Song" } },
    ],
    studyAfter: [
      { composer: "С. Рахманинов", title: { ru: "Прелюдия соль минор, Op. 23 №5", en: "Prelude in G minor, Op. 23 No. 5" } },
      { composer: "С. Рахманинов", title: { ru: "Музыкальный момент №4", en: "Moment musical No. 4" } },
      { composer: "С. Рахманинов", title: { ru: "Этюд-картина Op. 39", en: "Étude-tableau, Op. 39" } },
    ],
    scoreSources: [
      {
        label: "IMSLP",
        url: "https://imslp.org/wiki/Morceaux_de_fantaisie%2C_Op.3_(Rachmaninoff%2C_Sergei)",
        licenseNote: {
          ru: "Проверяйте статус конкретного издания и юрисдикцию перед скачиванием.",
          en: "Check the status of the specific edition and your jurisdiction before downloading.",
        },
      },
    ],
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getWorksByComposerId(composerId: string) {
  return works.filter((work) => work.composerId === composerId);
}
