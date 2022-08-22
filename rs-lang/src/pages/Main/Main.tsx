import React from 'react';
import './style.scss';

function Main() {
  return (
    <div className='main-wrapper'>
      <main className='main'>
        <div className='main__intro1'>
          <p className='main__intro-text'>Изучай английский с Lang.</p>
          <p className='main__intro-subtext'>
            Приложение для эффективного <br /> изучения иностранных слов в игровой <br /> форме
          </p>
        </div>
        <div className='main__img1'></div>
        <div className='main__intro2'>
          <p className='main__intro-text'>Изучай английский с Lang.</p>
          <p className='main__intro-subtext'>
            {' '}
            Приложение для эффективного <br /> изучения иностранных слов в <br /> игровой форме
          </p>
        </div>
        <div className='main__img2'></div>
      </main>
    </div>
  );
}

export default Main;
