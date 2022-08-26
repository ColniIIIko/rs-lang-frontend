import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import WordCards from '../../components/WordCards/WordCards';
import WordsDiff from '../../components/WordsDiffs/WordsDiff';
import { diffName, DiffsGroup, WordCard } from './types';
import './style.scss';

function Book() {
  const isAuth = false;
  const [activeDiff, setActiveDiff] = useState<DiffsGroup>(DiffsGroup['normal-easy']);

  const [cards, setCards] = useState<WordCard[] | null>(null);
  const [currentCard, setCurrentCard] = useState<WordCard | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  return (
    <div className='book'>
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
      <section className='book__cards'>
        <Pagination
          diff={DiffsGroup[activeDiff] as diffName}
          endpoint='/words'
          setData={setCards}
          setLoading={setLoading}
        >
          <WordCards
            setCurrentCard={setCurrentCard}
            data={cards}
            isLoading={isLoading}
          />
        </Pagination>
        <Card data={currentCard} />
      </section>
    </div>
  );
}

export default Book;
