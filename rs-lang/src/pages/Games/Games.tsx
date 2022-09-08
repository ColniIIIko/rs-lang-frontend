import { stat } from 'fs';
import React from 'react';
import { Link } from 'react-router-dom';
import { WordCard, WordCardAggregated } from '../Book/types';
import './style.scss';

type Props = {
  state: {
    fromBook: boolean;
    data?: WordCard[] | WordCardAggregated[] | null;
  };
};

function Games({ state }: Props) {
  return (
    <section className={`book__games ${!state.fromBook ? 'full-height' : ''}`}>
      {state.fromBook && (
        <div className='book__games-intro'>
          <h3 className='games-title'>Игры</h3>
          <p className='games-subtitle'>Закрепи знания в приятной форме</p>
        </div>
      )}
      <div className='book__games-list'>
        <div
          className='book__games__savannah book-game'
          aria-disabled={Boolean(
            (state.data && state.data?.length < 5 && state.fromBook) || (!state.data && state.fromBook)
          )}
        >
          <Link
            to='/games/audio-quest'
            state={state}
          >
            <div className='audio-quest-link game-link'>
              <h3 className='game-title'>Аудиовызов</h3>
              <p className='game-subtitle'>Попробуй понять какое слово произнесено</p>
            </div>
          </Link>
        </div>
        <div
          className='book__games__audio-quest book-game'
          aria-disabled={Boolean(
            (state.data && state.data?.length < 5 && state.fromBook) || (!state.data && state.fromBook)
          )}
        >
          <Link
            to='/games/sprint'
            state={state}
          >
            <div className='sprint-link game-link'>
              <h3 className='game-title'>Спринт</h3>
              <p className='game-subtitle'>Как можно быстрее определи верный перевод слова</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Games;
