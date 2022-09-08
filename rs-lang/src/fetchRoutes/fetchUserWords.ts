import { instance } from '../axios/axiosConfig';
import { WordCard, WordCardAggregated, WordCardAggregatedResponse, WordCardAggregated_ } from '../pages/Book/types';
import { store } from '../redux/store';

type Params = { page: number; group: number };

export const fetchWordUpdateOptions = async (
  userId: string,
  wordId: string,
  options: WordCardAggregated['userWord'] | undefined
) => {
  try {
    await instance.put(`/users/${userId}/words/${wordId}`, options);
  } catch {
    await instance.post(`/users/${userId}/words/${wordId}`, options);
  }
};

export const fetchWordAddToDiff = async (
  userId: string,
  wordId: string,
  currentOptions: WordCardAggregated['userWord'] | undefined
) => {
  try {
    await instance.put(`/users/${userId}/words/${wordId}`, {
      ...currentOptions,
      difficulty: 'difficult',
    });
  } catch {
    await instance.post(`/users/${userId}/words/${wordId}`, {
      difficulty: 'difficult',
    });
  }

  const { stat } = store.getState();

  await instance.put(`/users/${userId}/statistics`, stat.data);
};

export const fetchWordRemoveDiff = async (
  userId: string,
  wordId: string,
  currentOptions: WordCardAggregated['userWord'] | undefined
) => {
  await instance.put(`/users/${userId}/words/${wordId}`, {
    ...currentOptions,
    difficulty: 'normal',
  });
};

export const fetchWordRemoveDeleted = async (
  userId: string,
  wordId: string,
  currentOptions: WordCardAggregated['userWord'] | undefined
) => {
  await instance.put(`/users/${userId}/words/${wordId}`, {
    ...currentOptions,
    optional: {
      isDeleted: false,
    },
  });
};

export const fetchWordAddToDeleted = async (
  userId: string,
  wordId: string,
  currentOptions: WordCardAggregated['userWord'] | undefined
) => {
  const isUserWordExist = Boolean(currentOptions);

  try {
    await instance.put(`/users/${userId}/words/${wordId}`, {
      ...currentOptions,
      optional: {
        isDeleted: true,
      },
    });
  } catch {
    await instance.post(`/users/${userId}/words/${wordId}`, {
      optional: {
        isDeleted: true,
      },
    });
  }

  const { stat } = store.getState();

  await instance.put(`/users/${userId}/statistics`, stat.data);
};

const WordCardAggregatedDecorator = (words: WordCardAggregated_[]): WordCardAggregated[] => {
  return words.map((word) => {
    let { _id, ...newWord } = word;
    newWord.id = _id;
    if (!('userWord' in newWord)) {
      newWord = {
        ...newWord,
        userWord: {
          difficulty: 'normal',
          optional: {
            isDeleted: false,
            isLearned: false,
            isLearning: false,
            games: {
              sprint: {
                correctAnswers: 0,
                wrongAnswers: 0,
              },
              audioQuest: {
                correctAnswers: 0,
                wrongAnswers: 0,
              },
              correctAnswersStreak: 0,
            },
          },
        },
      };
    } else if (!('optional' in newWord.userWord)) {
      newWord = {
        ...newWord,
        userWord: {
          ...newWord.userWord,
          optional: {
            isDeleted: false,
            isLearned: false,
            isLearning: false,
            games: {
              sprint: {
                correctAnswers: 0,
                wrongAnswers: 0,
              },
              audioQuest: {
                correctAnswers: 0,
                wrongAnswers: 0,
              },
              correctAnswersStreak: 0,
            },
          },
        },
      };
    } else if (!('games' in newWord.userWord.optional!)) {
      newWord = {
        ...newWord,
        userWord: {
          ...newWord.userWord,
          optional: {
            ...newWord.userWord.optional,
            games: {
              sprint: {
                correctAnswers: 0,
                wrongAnswers: 0,
              },
              audioQuest: {
                correctAnswers: 0,
                wrongAnswers: 0,
              },
              correctAnswersStreak: 0,
            },
          },
        },
      };
    }
    return newWord as WordCardAggregated;
  });
};

export const fetchWordsAggregated = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 20,
      filter: {
        $and: [
          { 'userWord.optional.isDeleted': { $not: { $eq: true } } },
          { 'userWord.optional.isLearned': { $not: { $eq: true } } },
          { page: params.page },
          { group: params.group },
        ],
      },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults);
};

export const fetchWordsAggregatedDiff = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 600,
      filter: { $and: [{ 'userWord.difficulty': 'difficult' }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults.slice(params.page * 20, 20 * (params.page + 1)));
};

export const fetchWordsAggregatedDeleted = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 600,
      filter: { $and: [{ 'userWord.optional.isDeleted': true }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults.slice(params.page * 20, 20 * (params.page + 1)));
};

export const fetchWordsAggregatedLearning = async <T extends Params>(userId: string, params: T) => {
  const response = await instance.get<WordCardAggregatedResponse>(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage: 600,
      filter: { $and: [{ 'userWord.optional.isLearning': true }, { group: params.group }] },
    },
  });
  return WordCardAggregatedDecorator(response.data[0].paginatedResults.slice(params.page * 20, 20 * (params.page + 1)));
};

export const fetchWordsUnAuth = async <T>(params: T) => {
  const response = await instance.get<WordCard[]>('/words', {
    params,
  });

  return response.data;
};
