import React, { useState } from 'react';
import { DiffsGroup, WordCard, WordCardAggregated, WordsGroup } from '../../pages/Book/types';
import Games from '../../pages/Games/Games';
import CardsSection from './CardsSection';

type Props = {
  activeDiff: DiffsGroup;
  isBook: boolean;
  option: WordsGroup;
};

function GamesNCards({ isBook, option, activeDiff }: Props) {
  const [cards, setCards] = useState<WordCard[] | WordCardAggregated[] | null>(null);
  return (
    <>
      <CardsSection
        isBook={isBook}
        option={option}
        activeDiff={activeDiff}
        cards={cards}
        setCards={setCards}
      />
      <Games state={{ fromBook: true, data: cards }} />
    </>
  );
}

export default GamesNCards;
