import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { AuthResponse } from '../../redux/reducers/auth';
import './style.scss';

function ButtonUser() {
  const userName = useAppSelector((state) => state.auth.data?.name);

  return (
    <div className='buttons__user btn'>
      <p>{':' + userName || 'userName'}</p>
    </div>
  );
}

export default ButtonUser;
