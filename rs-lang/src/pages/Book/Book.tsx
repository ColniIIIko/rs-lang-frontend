import React, { useState } from 'react';
import WordsDiff from '../../components/WordsDiffs/WordsDiff';
import { DiffsGroup, WordsGroup } from './types';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAuth } from '../../redux/reducers/auth';
import './style.scss';
import DictionaryOptions from '../../components/DictionaryOptions/DictionaryOptions';
import GamesNCards from '../../components/CardsSection/GamesNCards';

function Book() {
  const [activeDiff, setActiveDiff] = useState<DiffsGroup>(DiffsGroup['normal-easy']);
  const [option, setOption] = useState<WordsGroup>(WordsGroup['difficult']);
  const [isBook, setBook] = useState<boolean>(true);
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <div className='book'>
      {isAuth && (
        <div className='book__heading'>
          <button
            className={`heading__title heading__title${isBook ? '_active' : ''}`}
            onClick={() => setBook(true)}
          >
            Учебник
          </button>
          <button
            className={`heading__title heading__title${!isBook ? '_active' : ''}`}
            onClick={() => setBook(false)}
          >
            Словарь
          </button>
        </div>
      )}
      <div className='book-top'>
        <form className='book__diffs'>
          <WordsDiff
            titles={['Normal', 'Advanced']}
            setActiveDiff={setActiveDiff}
            activeDiff={DiffsGroup[activeDiff]}
          />
        </form>
        <div className='book__img'></div>
      </div>
      {isAuth && !isBook && (
        <DictionaryOptions
          option={option}
          setOption={setOption}
        />
      )}
      <GamesNCards
        isBook={isBook}
        option={option}
        activeDiff={activeDiff}
      />
    </div>
  );
}

export default Book;
