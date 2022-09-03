import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import WordCards from '../../components/WordCards/WordCards';
import WordsDiff from '../../components/WordsDiffs/WordsDiff';
import { diffName, DiffsGroup, WordCard, WordCardAggregated, WordsGroup } from './types';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAuth } from '../../redux/reducers/auth';
import './style.scss';
import DictionaryOptions from '../../components/DictionaryOptions/DictionaryOptions';

function Book() {
  const [activeDiff, setActiveDiff] = useState<DiffsGroup>(DiffsGroup['normal-easy']);
  const [option, setOption] = useState<WordsGroup>(WordsGroup['difficult']);
  const [isBook, setBook] = useState<boolean>(true);
  const [isAction, setAction] = useState<boolean>(false);
  const isAuth = useAppSelector(selectIsAuth);

  const [cards, setCards] = useState<WordCard[] | WordCardAggregated[] | null>(null);
  const [currentCard, setCurrentCard] = useState<WordCard | WordCardAggregated | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (cards) setCurrentCard(cards[0]);
  }, [cards]);

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
      <section className='book__cards'>
        <Pagination
          diff={DiffsGroup[activeDiff] as diffName}
          isAction={isAction}
          setAction={setAction}
          setData={setCards}
          setLoading={setLoading}
          isBook={isBook}
          option={option}
        >
          <WordCards
            setCurrentCard={setCurrentCard}
            data={cards}
            isLoading={isLoading}
          />
        </Pagination>
        <Card
          data={currentCard}
          setAction={setAction}
          option={option}
          isBook={isBook}
        />
      </section>
    </div>
  );
}

export default Book;
