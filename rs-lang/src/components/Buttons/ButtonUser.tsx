import React from 'react';
import { AuthResponse } from '../../redux/reducers/auth';
import './style.scss';

function ButtonUser() {
  let userName = 'userName';
  const userString = localStorage.getItem('user');
  if (userString) {
    userName = (JSON.parse(userString) as AuthResponse).name;
  }

  return (
    <div className='buttons__user btn'>
      <p>{':' + userName}</p>
    </div>
  );
}

export default ButtonUser;
