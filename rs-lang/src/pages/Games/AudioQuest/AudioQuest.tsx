import React from 'react';
import { useLocation } from 'react-router';
import Loader from '../../../components/Loader/Loader';
import { useGame } from '../../../hooks/useGame';
import { useAppSelector } from '../../../redux/hooks';
import { selectIsAuth, selectUserId } from '../../../redux/reducers/auth';
import { WordCard, WordCardAggregated } from '../../Book/types';
import GameDiffs from '../components/GameDiffs';
import GameIntro from '../components/GameIntro';
import AudioQuestGame from './AudioQuestGame';

type state = {
  fromBook: boolean;
  data?: WordCard[] | WordCardAggregated[] | null;
};

function AudioQuest() {
  const location = useLocation();
  const locationState = location.state as state;
  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector(selectUserId);
  const { gameState, setGameState, setCurrentDiff, currentDiff, isReady, isLoading } = useGame(
    locationState.data || null,
    isAuth,
    userId || null
  );
  return (
    <div className='game-wrapper'>
      {isLoading && <Loader />}
      {!gameState.isGame && (
        <GameIntro
          title={'Аудиовызов'}
          subtitle={'Тренировка Аудиовызов улучшает твое восприятие речи на слух.'}
        />
      )}
      {!gameState.isGame && locationState.fromBook && (
        <div className='game-info'>
          <p className='game-info__text'>Игра начнется с текущими словами из словаря. Удачи!</p>
        </div>
      )}
      {!gameState.isGame && !locationState.fromBook && (
        <GameDiffs
          currentDiff={currentDiff}
          setCurrentDiff={setCurrentDiff}
        />
      )}
      {!gameState.isGame && (
        <button
          className='game-start-btn'
          disabled={!isReady}
          onClick={() => {
            setGameState({ ...gameState, isGame: true });
          }}
        >
          Начать
        </button>
      )}
      {gameState.isGame && <AudioQuestGame gameState={gameState} />}
    </div>
  );
}

export default AudioQuest;
