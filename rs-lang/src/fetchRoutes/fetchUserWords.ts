import { group } from 'console';
import { instance } from '../axios/axiosConfig';
import { WordCard, WordCardAggregated, WordCardAggregatedResponse, WordCardAggregated_ } from '../pages/Book/types';

export const fetchWordAddToDiff = async (userId: string, wordId: string) => {
  const response = await instance.post(`/users/${userId}/words/${wordId}`, {
    difficulty: 'difficult',
  });
};

const WordCardAggregatedDecorator = (words: WordCardAggregated_[]): WordCardAggregated[] => {
  return words.map((word) => {
    const { _id, ...newWord } = word;
    newWord.id = _id;

    return newWord;
  });
};

export const fetchWordsAggregated = async <T extends { page: number; group: number }>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 20,
      filter: { $and: [{ page: params.page }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults);
};

export const fetchWordsUnAuth = async <T>(params: T) => {
  const response = await instance.get<WordCard[]>('/words', {
    params,
  });

  return response.data;
};
