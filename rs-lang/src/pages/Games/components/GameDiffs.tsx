import React from 'react';
import { DiffsGroup } from '../../Book/types';

type Props = {
  currentDiff: DiffsGroup | null;
  setCurrentDiff: React.Dispatch<React.SetStateAction<DiffsGroup | null>>;
};

function GameDiffs({ currentDiff, setCurrentDiff }: Props) {
  return (
    <div>
      <p className='game-info__text'>выбери уровень:</p>
      <div className='game-difficulties'>
        <div
          className={`game-difficulty ${currentDiff === DiffsGroup['normal-easy'] ? 'game-difficulty_active' : ''}`}
          onClick={() => {
            currentDiff !== DiffsGroup['normal-easy'] && setCurrentDiff(DiffsGroup['normal-easy']);
          }}
        >
          A1
        </div>
        <div
          className={`game-difficulty ${currentDiff === DiffsGroup['normal-medium'] ? 'game-difficulty_active' : ''}`}
          onClick={() => {
            currentDiff !== DiffsGroup['normal-medium'] && setCurrentDiff(DiffsGroup['normal-medium']);
          }}
        >
          A2
        </div>
        <div
          className={`game-difficulty ${currentDiff === DiffsGroup['normal-hard'] ? 'game-difficulty_active' : ''}`}
          onClick={() => {
            currentDiff !== DiffsGroup['normal-hard'] && setCurrentDiff(DiffsGroup['normal-hard']);
          }}
        >
          B1
        </div>
        <div
          className={`game-difficulty ${currentDiff === DiffsGroup['advanced-easy'] ? 'game-difficulty_active' : ''}`}
          onClick={() => {
            currentDiff !== DiffsGroup['advanced-easy'] && setCurrentDiff(DiffsGroup['advanced-easy']);
          }}
        >
          B2
        </div>
        <div
          className={`game-difficulty ${currentDiff === DiffsGroup['advanced-medium'] ? 'game-difficulty_active' : ''}`}
          onClick={() => {
            currentDiff !== DiffsGroup['advanced-medium'] && setCurrentDiff(DiffsGroup['advanced-medium']);
          }}
        >
          C1
        </div>
        <div
          className={`game-difficulty ${currentDiff === DiffsGroup['advanced-hard'] ? 'game-difficulty_active' : ''}`}
          onClick={() => {
            currentDiff !== DiffsGroup['advanced-hard'] && setCurrentDiff(DiffsGroup['advanced-hard']);
          }}
        >
          C2
        </div>
      </div>
    </div>
  );
}

export default GameDiffs;
