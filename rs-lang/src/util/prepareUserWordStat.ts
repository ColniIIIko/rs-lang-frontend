import { UserStat, WordCardAggregated } from '../pages/Book/types';
import { gameWord } from '../pages/Games/types';
import { store } from '../redux/store';

export const prepareUserWordStat = (words: gameWord[], game: 'audioQuest' | 'sprint') => {
  const { stat } = store.getState();
  let userStatistics: UserStat = stat.data!;
  if (!('games' in userStatistics.optional)) {
    userStatistics = {
      ...userStatistics,
      optional: {
        ...userStatistics.optional,
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
    };
  }
  const sendWords = words.map((word) => {
    const sendWord = word.data as WordCardAggregated;
    if (word.isCorrect) {
      sendWord.userWord.optional.games[game].correctAnswers += 1;
      sendWord.userWord.optional.games.correctAnswersStreak += 1;
      userStatistics.optional.games![game].correctAnswers += 1;
      if (sendWord.userWord.optional.games.correctAnswersStreak >= 3) {
        sendWord.userWord.optional.isLearned = true;
        userStatistics.learnedWords += 1;
      }
    } else {
      sendWord.userWord.optional.games[game].wrongAnswers += 1;
      sendWord.userWord.optional.games.correctAnswersStreak = 0;
      userStatistics.optional.games![game].wrongAnswers += 1;
    }
    if (!sendWord.userWord.optional.isLearning) {
      userStatistics.optional.learningCount += 1;
      sendWord.userWord.optional.isLearning = true;
    }

    return sendWord;
  });

  return {
    user: userStatistics,
    words: sendWords,
  };
};
