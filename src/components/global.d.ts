export interface StyleConfig {
  hanzi: HanziStyle;
  pinyin: PinyinStyle;
}

export interface HanziStyle {
  width?: number;
}
export interface PinyinStyle {
  width?: number;
}

export interface CharactersStep {
  total: number;
  currentStep: number;
}

export interface PinyinData {
  id: string;
  media: Array<string>;
  p: string;
  p_heteronym: Array<string>;
  p_number: string;
  s: string;
}

export interface WriterConfig {
  isRadicalHighlight: boolean;
  isAnimating: boolean;
  isDoing: boolean;
  isQuiz: boolean;
}
