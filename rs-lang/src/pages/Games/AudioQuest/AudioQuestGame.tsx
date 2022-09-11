import React, { useEffect, useState } from 'react';
import { fetchUserUpdateStat } from '../../../fetchRoutes/fetchUserStats';
import { fetchWordUpdateOptions } from '../../../fetchRoutes/fetchUserWords';
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
};

const audioController = new Audio();

function AudioQuestGame({ gameState }: Props) {
  const [isEnd, setEnd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words] = useState(shuffle<gameWord>(gameState.words!));

  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (currentIndex === words.length - 1) setEnd(true);
    else setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    audioController.src = `${process.env.REACT_APP_DB}/${words[currentIndex].data.audio}`;
    audioController.play();
  }, [currentIndex]);

  useEffect(() => {
    const sendData = async () => {
      if (isEnd && isAuth) {
        const data = prepareUserWordStat(words.slice(0, currentIndex + 1), 'audioQuest');
        fetchUserUpdateStat(userId!, data.user);
        data.words.forEach((word) => {
          fetchWordUpdateOptions(userId!, word.id, word.userWord);
        });
        return true;
      }
      return false;
    };

    sendData().then((isOk: boolean) => {
      isOk && dispatch(fetchStatThunk(userId!));
    });
  }, [isEnd]);

  return (
    <div className='audio-quest-game'>
      {!isEnd && (
        <div className='audio-quest-game-wrapper'>
          <div
            className='audio-quest-game__current-word'
            onClick={() => {
              audioController.src = `${process.env.REACT_APP_DB}/${words[currentIndex].data.audio}`;
              audioController.play();
            }}
          >
            <img src='/assets/svg/rs-lang-speaker.svg' />
          </div>
          <div className='audio-quest-game__answers'>
            {shuffle([
              ...pickRandomFromArray<gameWord>(words, words.length > 4 ? 3 : words.length - 1, [currentIndex]),
              words[currentIndex],
            ]).map((answer, index) => (
              <p
                className='audio-quest-game__answer'
                key={answer.data.id}
                onClick={(e) => {
                  if (answer.data.id === words[currentIndex].data.id) {
                    (e.target as HTMLParagraphElement).style.backgroundColor = '#4CCBB7';
                    words[currentIndex].isCorrect = true;
                  } else {
                    (e.target as HTMLParagraphElement).style.backgroundColor = '#FF7171';
                  }
                  setTimeout(() => {
                    handleNext();
                    (e.target as HTMLParagraphElement).style.backgroundColor = '';
                  }, 800);
                }}
              >{`${index + 1}.${answer.data.wordTranslate}`}</p>
            ))}
          </div>
          <button
            className='audio-quest-game__skip-btn'
            onClick={() => handleNext()}
          >
            Не знаю
          </button>
        </div>
      )}
      {isEnd && <Statistics data={words} />}
    </div>
  );
}

export default AudioQuestGame;
