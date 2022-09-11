import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import './style.scss';

function Profile() {
  const stat = useAppSelector((state) => state.stat.data);

  return (
    <>
      {stat && (
        <div className='profile'>
          <h1 className='profile__title'>Статистика</h1>
          <div className='profile__overAll-stat'>
            <div className='overAll-stat'>
              <div className='overAll-stat__stat'>
                <span className='overAll-stat__value'>{stat.learnedWords}</span>
                <span className='overAll-stat__title'>слов изучено</span>
              </div>
              <div className='overAll-stat__stat'>
                <span className='overAll-stat__value'>
                  {(
                    ((stat.optional.games.audioQuest.correctAnswers + stat.optional.games.sprint.correctAnswers) /
                      (stat.optional.games.audioQuest.correctAnswers +
                        stat.optional.games.sprint.correctAnswers +
                        stat.optional.games.sprint.wrongAnswers +
                        stat.optional.games.audioQuest.wrongAnswers)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
                <span className='overAll-stat__title'>правильных ответов</span>
              </div>
            </div>
          </div>
          <div className='game-stat'>
            <div className='game-stat__stat'>
              <h3 className='game-stat__title'>Спринт</h3>
              <span className='game-stat__value'>
                Правильных ответов: <b>{stat.optional.games.sprint.correctAnswers}</b>
              </span>
              <span className='game-stat__value'>
                Неправильных ответов: <b>{stat.optional.games.sprint.wrongAnswers}</b>
              </span>
            </div>
            <div className='game-stat__stat'>
              <h3 className='game-stat__title'>Аудиовызов</h3>
              <span className='game-stat__value'>
                Правильных ответов: <b>{stat.optional.games.audioQuest.correctAnswers}</b>
              </span>
              <span className='game-stat__value'>
                Неправильных ответов: <b>{stat.optional.games.audioQuest.wrongAnswers}</b>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
