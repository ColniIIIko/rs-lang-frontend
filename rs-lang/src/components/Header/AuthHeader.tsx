import React from 'react';
import Logo from '../Logo/Logo';
import './style.scss';

type Props = {};

function AuthHeader({}: Props) {
  return (
    <div className='header-wrapper'>
      <header className='header'>
        <Logo />
      </header>
    </div>
  );
}

export default AuthHeader;
