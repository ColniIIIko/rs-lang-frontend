export interface WordCard {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export enum DiffsGroup {
  'normal-easy',
  'normal-medium',
  'normal-hard',
  'advanced-easy',
  'advanced-medium',
  'advanced-hard',
}

export type diffName = keyof typeof DiffsGroup;
