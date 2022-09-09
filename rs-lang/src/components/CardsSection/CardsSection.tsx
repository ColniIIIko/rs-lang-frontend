import React, { useState, useEffect } from 'react';
import { diffName, DiffsGroup, WordCard, WordCardAggregated, WordsGroup } from '../../pages/Book/types';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import WordCards from '../WordCards/WordCards';

type Props = {
  activeDiff: DiffsGroup;
  isBook: boolean;
  option: WordsGroup;
  cards: WordCard[] | WordCardAggregated[] | null;
  setCards: React.Dispatch<React.SetStateAction<WordCard[] | WordCardAggregated[] | null>>;
};

function CardsSection({ activeDiff, isBook, option, cards, setCards }: Props) {
  const [isAction, setAction] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<WordCard | WordCardAggregated | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (cards) setCurrentCard(cards[0]);
  }, [cards]);

  return (
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
  );
}

export default CardsSection;
