import { instance } from '../axios/axiosConfig';
import { WordCard, WordCardAggregated, WordCardAggregatedResponse, WordCardAggregated_ } from '../pages/Book/types';
import { store } from '../redux/store';

type Params = { page: number; group: number };

export const fetchWordAddToDiff = async (userId: string, wordId: string) => {
  await instance.post(`/users/${userId}/words/${wordId}`, {
    difficulty: 'difficult',
  });

  const { stat } = store.getState();

  await instance.put(`/users/${userId}/statistics`, stat.data);
};

const WordCardAggregatedDecorator = (words: WordCardAggregated_[]): WordCardAggregated[] => {
  return words.map((word) => {
    const { _id, ...newWord } = word;
    newWord.id = _id;

    return newWord;
  });
};

export const fetchWordsAggregated = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 20,
      filter: { $and: [{ page: params.page }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults);
};

export const fetchWordsAggregatedDiff = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 20,
      filter: { $and: [{ 'userWord.difficulty': 'difficult' }, { page: params.page }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults);
};

export const fetchWordsAggregatedDeleted = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 20,
      filter: { $and: [{ 'userWord.options.isDeleted': true }, { page: params.page }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults);
};

export const fetchWordsAggregatedLearning = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 20,
      filter: { $and: [{ 'userWord.options.isLearning': true }, { page: params.page }, { group: params.group }] },
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
