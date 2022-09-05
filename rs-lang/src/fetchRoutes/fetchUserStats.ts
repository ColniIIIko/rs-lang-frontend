import { instance } from '../axios/axiosConfig';
import { UserStat } from '../pages/Book/types';

export const fetchUserUpdateStat = async (userId: string, stat: UserStat) => {
  const response = await instance.put<UserStat>(`/users/${userId}/statistics`, stat);

  return response.data;
};

export const fetchUserGetStat = async (userId: string) => {
  try {
    const response = await instance.get<UserStat>(`/users/${userId}/statistics`);
    const { learnedWords, optional } = response.data;
    return { learnedWords, optional };
  } catch {
    const { learnedWords, optional } = await fetchUserUpdateStat(userId, {
      learnedWords: 0,
      optional: {
        deletedCount: 0,
        learningCount: 0,
        difficultCount: 0,
        learnedCount: 0,
        games: {
          sprint: {
            correctAnswers: 0,
            wrongAnswers: 0,
          },
          audioQuest: {
            correctAnswers: 0,
            wrongAnswers: 0,
          },
        },
      },
    });
    return { learnedWords, optional };
  }
};
