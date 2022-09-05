import React, { useEffect, useRef, useState } from 'react';
import { fetchUserUpdateStat } from '../../../fetchRoutes/fetchUserStats';
import { fetchWordUpdateOptions } from '../../../fetchRoutes/fetchUserWords';
import { useCountDown } from '../../../hooks/useCountDown';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectIsAuth, selectUserId } from '../../../redux/reducers/auth';
import { fetchStatThunk } from '../../../redux/reducers/stat';
import { pickRandomFromArray } from '../../../util/pickRandomFromArray';
import { prepareUserWordStat } from '../../../util/prepareUserWordStat';
import { shuffle } from '../../../util/shuffle';
import Statistics from '../components/Statistics';
import { gameState, gameWord } from '../types';
import './style.scss';

type Props = {
  gameState: gameState;
  setGameState: React.Dispatch<React.SetStateAction<gameState>>;
};

function SprintGame({ gameState, setGameState }: Props) {
  const [isEnd, setEnd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState(shuffle<gameWord>(gameState.words!));
  const [currentAnswer, setCurrentAnswer] = useState<gameWord>(gameState.words![0]);

  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const { counter } = useCountDown(30, () => setEnd(true));
  const imgIsCorrectRef = useRef<HTMLImageElement>(null);

  const handleNext = () => {
    if (currentIndex === words.length - 1) setEnd(true);
    else setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    setCurrentAnswer(Math.random() > 0.5 ? words[currentIndex] : words[Math.round(Math.random() * 19)]);
  }, [currentIndex]);

  useEffect(() => {
    const sendData = async () => {
      if (isEnd && isAuth) {
        const data = prepareUserWordStat(words.slice(0, currentIndex + 1), 'sprint');
        fetchUserUpdateStat(userId!, data.user);
        data.words.forEach((word) => {
          fetchWordUpdateOptions(userId!, word.id, word.userWord);
        });
      }
    };

    sendData().then(() => dispatch(fetchStatThunk(userId!)));
  }, [isEnd]);

  return (
    <div className='sprint-game'>
      {!isEnd && (
        <div className='sprint-game-wrapper'>
          <div className='sprint-game-timer'>
            <span className='timer'>{counter}</span>
          </div>
          <div className='sprint-correct'>
            <img
              style={{ transition: 'all .1s ease' }}
              ref={imgIsCorrectRef}
              src='/assets/svg/rs-lang-correct.svg'
            />
          </div>
          <div className='sprint-game__question'>
            <span className='sprint-game__current-word'>{words[currentIndex].data.word}</span>
            <span className='sprint-game__and'>это</span>
            <span className='sprint-game__answer'>{currentAnswer.data.wordTranslate}?</span>
          </div>
          <div className='sprint-game__btns'>
            <button
              className='sprint-game__correct-btn sprint-game__btn'
              onClick={() => {
                if (words[currentIndex].data.id === currentAnswer.data.id) {
                  imgIsCorrectRef.current!.style.filter =
                    'invert(71%) sepia(55%) saturate(397%) hue-rotate(120deg) brightness(88%) contrast(92%)';
                  words[currentIndex].isCorrect = true;
                } else {
                  imgIsCorrectRef.current!.style.filter =
                    'invert(58%) sepia(92%) saturate(1282%) hue-rotate(317deg) brightness(108%) contrast(98%)';
                }
                setTimeout(() => {
                  imgIsCorrectRef.current!.style.filter = '';
                  handleNext();
                }, 200);
              }}
            >
              Правильно
            </button>
            <button
              className='sprint-game__incorrect-btn sprint-game__btn'
              onClick={() => {
                if (words[currentIndex].data.id !== currentAnswer.data.id) {
                  imgIsCorrectRef.current!.style.filter =
                    'invert(71%) sepia(55%) saturate(397%) hue-rotate(120deg) brightness(88%) contrast(92%)';
                  words[currentIndex].isCorrect = true;
                } else {
                  imgIsCorrectRef.current!.style.filter =
                    'invert(58%) sepia(92%) saturate(1282%) hue-rotate(317deg) brightness(108%) contrast(98%)';
                }
                setTimeout(() => {
                  imgIsCorrectRef.current!.style.filter = '';
                  handleNext();
                }, 200);
              }}
            >
              Неправильно
            </button>
          </div>
        </div>
      )}
      {isEnd && <Statistics data={words.slice(0, currentIndex + 1)} />}
    </div>
  );
}

export default SprintGame;
