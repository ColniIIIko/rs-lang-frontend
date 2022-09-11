import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { AuthResponse } from '../../redux/reducers/auth';
import './style.scss';

type Props = {
  onClick?: () => void;
};

function ButtonUser({ onClick }: Props) {
  const userName = useAppSelector((state) => state.auth.data?.name);

  return (
    <Link to='/profile'>
      <div
        className='buttons__user btn'
        onClick={onClick}
      >
        <p>{':' + userName || 'userName'}</p>
      </div>
    </Link>
  );
}

export default ButtonUser;
