import { useEffect, useState } from 'react';
import { fetchWordsAggregated, fetchWordsUnAuth } from '../fetchRoutes/fetchUserWords';
import { DiffsGroup, WordCard, WordCardAggregated } from '../pages/Book/types';
import { gameState } from '../pages/Games/types';

type Params = { page: number; group: number };

const initialState = (data: WordCard[] | WordCardAggregated[] | null): gameState => {
  const words = data
    ? data.map((card) => {
        return { data: card, isCorrect: false };
      })
    : null;

  return {
    isGame: false,
    words,
  };
};

export const useGame = (data: WordCard[] | WordCardAggregated[] | null, isAuth: boolean, userId: string | null) => {
  const [gameState, setGameState] = useState<gameState>(initialState(data || null));
  const [currentDiff, setCurrentDiff] = useState<DiffsGroup | null>(null);
  const [isReady, setReady] = useState<boolean>(Boolean(gameState.words));
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const updateState = async (page: number, group: number) => {
      setLoading(true);
      const data = isAuth
        ? await fetchWordsAggregated<Params>(userId!, { page, group })
        : await fetchWordsUnAuth<Params>({ page, group });
      setLoading(false);

      return initialState(data);
    };

    const setWordsAccordingDiff = async () => {
      const randomPage = Math.round(Math.random() * 29);
      setGameState(await updateState(randomPage, currentDiff as number));
    };

    if (currentDiff !== null) {
      setWordsAccordingDiff();
      setReady(true);
    }
  }, [currentDiff]);

  return {
    gameState,
    setGameState,
    setCurrentDiff,
    currentDiff,
    isReady,
    isLoading,
  };
};
