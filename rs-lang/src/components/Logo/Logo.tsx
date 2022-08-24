import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Logo() {
  return (
    <Link to='/'>
      <h1 className='logo'>Lang</h1>
    </Link>
  );
}

export default Logo;
