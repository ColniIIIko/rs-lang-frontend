import React from 'react';
import { DiffsGroup, diffName } from '../../pages/Book/types';

type Props = {
  titles: string[];
  activeDiff: string;
  setActiveDiff: React.Dispatch<React.SetStateAction<DiffsGroup>>;
};

function WordsDiff({ titles, setActiveDiff, activeDiff }: Props) {
  return (
    <>
      {titles.map((title, index) => (
        <div
          key={index}
          className='book__diff'
        >
          <h3 className='diff-title'>{title}</h3>
          <div className='diff__sub-diffs'>
            <div>
              <input
                type={'radio'}
                id={`${title.toLowerCase()}-easy`}
                value={`${title.toLowerCase()}-easy`}
                name='diffs'
                onChange={(e) => setActiveDiff(DiffsGroup[e.target.value as diffName])}
                checked={activeDiff === `${title.toLowerCase()}-easy`}
              />
              <label
                htmlFor={`${title.toLowerCase()}-easy`}
                className='diff-name'
              >
                Easy
              </label>
            </div>
            <div>
              <input
                type={'radio'}
                id={`${title.toLowerCase()}-medium`}
                value={`${title.toLowerCase()}-medium`}
                name='diffs'
                onChange={(e) => setActiveDiff(DiffsGroup[e.target.value as diffName])}
                checked={activeDiff === `${title.toLowerCase()}-medium`}
              />
              <label
                htmlFor={`${title.toLowerCase()}-medium`}
                className='diff-name'
              >
                Medium
              </label>
            </div>
            <div>
              <input
                type={'radio'}
                id={`${title.toLowerCase()}-hard`}
                value={`${title.toLowerCase()}-hard`}
                name='diffs'
                onChange={(e) => setActiveDiff(DiffsGroup[e.target.value as diffName])}
                checked={activeDiff === `${title.toLowerCase()}-hard`}
              />
              <label
                htmlFor={`${title.toLowerCase()}-hard`}
                className='diff-name'
              >
                Hard
              </label>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default React.memo(WordsDiff);
