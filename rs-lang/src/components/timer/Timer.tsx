import React from 'react';
import { useCountDown } from '../../hooks/useCountDown';

type Props = {
  action: () => void;
};

function Timer({ action }: Props) {
  const { counter } = useCountDown(30, action);
  return (
    <div className='sprint-game-timer'>
      <span className='timer'>{counter}</span>
    </div>
  );
}

export default Timer;
