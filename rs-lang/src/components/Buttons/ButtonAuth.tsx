import React from 'react';
import './style.scss';

function ButtonAuth() {
  return (
    <div className='buttons'>
      <div className='buttons__register btn'>
        <p>Регистрация</p>
      </div>
      <div className='buttons__login btn'>
        <p>Войти</p>
      </div>
    </div>
  );
}

export default ButtonAuth;
