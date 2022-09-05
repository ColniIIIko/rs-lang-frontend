import React from 'react';
import { Navigate, useNavigate } from 'react-router';
import { gameWord } from '../types';
import './style.scss';

type Props = {
  data: gameWord[];
};

const audioController = new Audio();

function Statistics({ data }: Props) {
  const correctAnswers = data.filter((word) => word.isCorrect);
  const incorrectAnswers = data.filter((word) => !word.isCorrect);
  const navigate = useNavigate();
  return (
    <div className='game-statistics-wrapper'>
      <div className='game-statistics'>
        <div className='correct-answers'>
          <div className='correct-answers__title-wrapper'>
            <span className='correct-answers__title'>Правильные ответы</span>
            <span className='correct-answers__amount'>{correctAnswers.length}</span>
          </div>
          <div className='correct-answers__answers'>
            {correctAnswers.map((answer) => (
              <div
                key={answer.data.id}
                className='answer'
              >
                <img
                  className='word-transcript-audio'
                  src='/assets/svg/rs-lang-audio-ico-s.svg'
                  onClick={() => {
                    audioController.src = `${process.env.REACT_APP_DB}/${answer.data.audio}`;
                    audioController.play();
                  }}
                ></img>
                <span className='answer__word'>{answer.data.word}</span>
                <span className='answer__word-translate'>{answer.data.wordTranslate}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='incorrect-answers'>
          <div className='incorrect-answers__title-wrapper'>
            <span className='incorrect-answers__title'>Неправильные ответы</span>
            <span className='incorrect-answers__amount'>{incorrectAnswers.length}</span>
          </div>
          <div className='incorrect-answers__answers'>
            {incorrectAnswers.map((answer) => (
              <div
                key={answer.data.id}
                className='answer'
              >
                <img
                  className='word-transcript-audio'
                  src='/assets/svg/rs-lang-audio-ico-s.svg'
                  onClick={() => {
                    new Audio(`${process.env.REACT_APP_DB}/${answer.data.audio}`).play();
                  }}
                ></img>
                <span className='answer__word'>{answer.data.word}</span>
                <span className='answer__word-translate'>{answer.data.wordTranslate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='game-statistics__btns'>
        <button
          className='btns__play-again-btn'
          onClick={() => navigate('/games')}
        >
          Сыграть ещё раз
        </button>
        <button
          className='btns__return-to-book-btn'
          onClick={() => navigate('/book')}
        >
          Перейти в учебник
        </button>
      </div>
    </div>
  );
}

export default Statistics;
