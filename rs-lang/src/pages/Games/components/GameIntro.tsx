import React from 'react';

type Props = {
  title: string;
  subtitle: string;
};

function GameIntro({ title, subtitle }: Props) {
  return (
    <div className='game-intro'>
      <h2 className='game-single-title'>{title}</h2>
      <p className='game-single-subtitle'>{subtitle}</p>
    </div>
  );
}

export default GameIntro;
