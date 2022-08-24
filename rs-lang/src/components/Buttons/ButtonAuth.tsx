import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function ButtonAuth() {
  return (
    <div className='buttons'>
      <Link to='/register'>
        <button className='buttons__register btn'>Регистрация</button>
      </Link>
      <Link to='/login'>
        <button className='buttons__login btn'>Войти</button>
      </Link>
    </div>
  );
}

export default ButtonAuth;
