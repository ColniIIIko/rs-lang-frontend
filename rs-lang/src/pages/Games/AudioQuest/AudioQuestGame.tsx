import React, { useEffect, useState } from 'react';
import { pickRandomFromArray } from '../../../util/pickRandomFromArray';
import { shuffle } from '../../../util/shuffle';
import Statistics from '../components/Statistics';
import { gameState, gameWord } from '../types';
import './style.scss';

type Props = {
  gameState: gameState;
  setGameState: React.Dispatch<React.SetStateAction<gameState>>;
};

const audioController = new Audio();

function AudioQuestGame({ gameState, setGameState }: Props) {
  const [isEnd, setEnd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState(shuffle<gameWord>(gameState.words!));

  const handleNext = () => {
    if (currentIndex === 19) setEnd(true);
    else setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    audioController.src = `${process.env.REACT_APP_DB}/${words[currentIndex].data.audio}`;
    audioController.play();
  }, [currentIndex]);

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
            {shuffle([...pickRandomFromArray<gameWord>(words, 3, [currentIndex]), words[currentIndex]]).map(
              (answer, index) => (
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
              )
            )}
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
