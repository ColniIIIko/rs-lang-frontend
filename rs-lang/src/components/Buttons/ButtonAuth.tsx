import React from 'react';
import './style.scss';

function ButtonAuth() {
  return (
    <div className='buttons'>
      <button className='buttons__register btn'>Регистрация</button>
      <button className='buttons__login btn'>Войти</button>
    </div>
  );
}

export default ButtonAuth;
