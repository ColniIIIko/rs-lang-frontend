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

export interface WordCardAggregated_ extends WordCard {
  _id: string;
  userWord: {
    difficulty: string;
  };
}

export interface WordCardAggregated extends WordCard {
  userWord: {
    difficulty: string;
  };
}
// export type WordCardAggregated = Omit<WordCard, 'id'> & {
//   _id: string;
//   userWord: {
//     difficulty: string;
//   };
// };

export type WordCardAggregatedResponse = [
  {
    paginatedResults: WordCardAggregated_[];
    totalCount: [{ count: number }];
  }
];

export enum DiffsGroup {
  'normal-easy',
  'normal-medium',
  'normal-hard',
  'advanced-easy',
  'advanced-medium',
  'advanced-hard',
}

export type diffName = keyof typeof DiffsGroup;
