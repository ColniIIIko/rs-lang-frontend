import React from 'react';
import { useLocation } from 'react-router';
import { WordCard, WordCardAggregated } from '../Book/types';

type state = {
  fromBook: boolean;
  data?: WordCard[] | WordCardAggregated[] | null;
};

function Savannah() {
  const location = useLocation();
  const state = location.state as state;
  return <div className='game-wrapper'></div>;
}

export default Savannah;
