import { wordGameStatistics } from '../Games/types';

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
    optional?: {
      isDeleted?: boolean;
      isLearning?: boolean;
      isLearned?: boolean;
      games?: {
        sprint?: wordGameStatistics;
        audioQuest?: wordGameStatistics;
        correctAnswersStreak: number;
      };
    };
  };
}

export interface WordCardAggregated extends WordCard {
  userWord: {
    difficulty: string;
    optional: {
      isDeleted: boolean;
      isLearning: boolean;
      isLearned: boolean;
      games: {
        sprint: wordGameStatistics;
        audioQuest: wordGameStatistics;
        correctAnswersStreak: number;
      };
    };
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

export interface UserStat {
  learnedWords: number;
  optional: UserStatOptions;
}

export interface UserStatOptions {
  deletedCount: number;
  learningCount: number;
  difficultCount: number;
  learnedCount: number;
  games?: {
    sprint: wordGameStatistics;
    audioQuest: wordGameStatistics;
  };
}

export enum DiffsGroup {
  'normal-easy',
  'normal-medium',
  'normal-hard',
  'advanced-easy',
  'advanced-medium',
  'advanced-hard',
}

export enum WordsGroup {
  'deleted',
  'learning',
  'difficult',
  'learned',
}

export type diffName = keyof typeof DiffsGroup;
export type wordsOptsName = keyof typeof WordsGroup;
