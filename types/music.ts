export type LocaleText = {
  ru: string;
  en: string;
};

export type EraId =
  | "baroque"
  | "classical"
  | "romantic"
  | "impressionism"
  | "modern"
  | "neoclassical";

export type Composer = {
  id: string;
  slug: string;
  name: LocaleText;
  fullName: LocaleText;
  born: string;
  died?: string;
  country: LocaleText;
  era: EraId;
  portrait?: string;
  biography: LocaleText;
};

export type WorkFact = {
  label: LocaleText;
  value: LocaleText;
};

export type FormSection = {
  mark: string;
  name: string;
  bars?: string;
  description: LocaleText;
};

export type TechnicalChallenge = {
  name: LocaleText;
  level: LocaleText;
  score: number;
};

export type Performance = {
  pianist: string;
  label: LocaleText;
  note: LocaleText;
  url?: string;
};

export type StudyRecommendation = {
  composer: string;
  title: LocaleText;
  workSlug?: string;
};

export type Work = {
  id: string;
  slug: string;
  passportNumber: string;
  composerId: string;
  title: LocaleText;
  subtitle?: LocaleText;
  catalogue?: string;
  opus?: string;
  genre: LocaleText;
  era: EraId;
  year: string;
  composerAge?: string;
  place?: LocaleText;
  key?: LocaleText;
  meter?: string;
  tempo?: string;
  duration?: string;
  difficulty: number;
  formName?: LocaleText;
  character: LocaleText[];
  palette: string[];
  facts: WorkFact[];
  storyTitle: LocaleText;
  story: LocaleText[];
  composerThoughts?: LocaleText;
  composerQuote?: LocaleText;
  form: FormSection[];
  challenges: TechnicalChallenge[];
  performances: Performance[];
  studyBefore: StudyRecommendation[];
  studyAfter: StudyRecommendation[];
  scoreSources?: {
    label: string;
    url: string;
    licenseNote: LocaleText;
  }[];
};
