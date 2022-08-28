import React from 'react';
import { Rings } from 'react-loader-spinner';
import './style.scss';

type Props = {};

function Loader({}: Props) {
  return (
    <div className='loader-wrapper'>
      <Rings
        height='100'
        width='100'
        color='#fff4fb'
        visible={true}
      />
    </div>
  );
}

export default Loader;
