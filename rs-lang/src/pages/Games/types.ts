import { WordCard, WordCardAggregated } from '../Book/types';

export type currentGame = 'savannah' | 'audioQuest';

export type gameWord = {
  data: WordCardAggregated | WordCard;
  isCorrect: boolean;
};

export type gameState = {
  isGame: boolean;
  words: gameWord[] | null;
};

export type wordGameStatistics = {
  wrongAnswers: number;
  correctAnswers: number;
};
