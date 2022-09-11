import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

type Props = {
  onClick?: () => void;
};

function ButtonAuth({ onClick }: Props) {
  return (
    <div className='buttons'>
      <Link to='/register'>
        <button
          className='buttons__register btn'
          onClick={onClick}
        >
          Регистрация
        </button>
      </Link>
      <Link to='/login'>
        <button
          className='buttons__login btn'
          onClick={onClick}
        >
          Войти
        </button>
      </Link>
    </div>
  );
}

export default ButtonAuth;
