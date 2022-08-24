import React from 'react';
import './style.scss';

function ButtonUser() {
  const userName = 'UserName';
  return (
    <div className='buttons__user btn'>
      <p>{':' + userName}</p>
    </div>
  );
}

export default ButtonUser;
