import React, { useEffect, useRef } from 'react';
import { WordCard } from '../../pages/Book/types';
import './style.scss';

type Props = {
  data: WordCard | null;
};

function Card({ data }: Props) {
  const pMeaningRef = useRef<HTMLParagraphElement>(null);
  const pExampleRef = useRef<HTMLParagraphElement>(null);

  const audioTranscriptRef = useRef<HTMLAudioElement>(null);
  const audioMeaningRef = useRef<HTMLAudioElement>(null);
  const audioExampleRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (data && pMeaningRef.current && pExampleRef.current) {
      pMeaningRef.current.innerHTML = data.textMeaning;
      pExampleRef.current.innerHTML = data.textExample;
    }
  }, [data]);

  return data ? (
    <div className='card-full'>
      <div
        className='card__img'
        style={{ background: `url(${process.env.REACT_APP_DB}/${data.image})` }}
      />
      <div className='card__word-text'>
        <p className='word'>{data.word}</p>
        <p className='word-translate'>{data.wordTranslate}</p>
      </div>
      <div className='card__word-transcript'>
        <p className='word-transcript'>{data.transcription}</p>
        <img
          className='word-transcript-audio'
          src='/assets/svg/rs-lang-audio-ico.svg'
          onClick={() => {
            audioTranscriptRef.current?.play();
          }}
        ></img>
        <audio
          ref={audioTranscriptRef}
          src={`${process.env.REACT_APP_DB}/${data.audio}`}
        ></audio>
      </div>
      <div className='card__meaning'>
        <div className='subtitle-wrapper'>
          <h4 className='meaning-title card-subtitle'>Значение</h4>
          <img
            className='word-transcript-audio'
            src='/assets/svg/rs-lang-audio-ico.svg'
            onClick={() => {
              audioMeaningRef.current?.play();
            }}
          ></img>
        </div>
        <p
          ref={pMeaningRef}
          className='meaning-text card-subtext'
        />
        <audio
          ref={audioMeaningRef}
          src={`${process.env.REACT_APP_DB}/${data.audioMeaning}`}
        ></audio>
        <p className='meaning-text-translate card-subtext-translate'>{data.textMeaningTranslate}</p>
      </div>
      <div className='card__example'>
        <div className='subtitle-wrapper'>
          <h4 className='example-title card-subtitle'>Пример</h4>
          <img
            className='word-transcript-audio'
            src='/assets/svg/rs-lang-audio-ico.svg'
            onClick={() => {
              audioExampleRef.current?.play();
            }}
          ></img>
        </div>
        <p
          ref={pExampleRef}
          className='example-text card-subtext'
        />
        <audio
          ref={audioExampleRef}
          src={`${process.env.REACT_APP_DB}/${data.audioExample}`}
        ></audio>
        <p className='example-text-translate card-subtext-translate'>{data.textExampleTranslate}</p>
      </div>
    </div>
  ) : (
    <div className='card-full card-empty'></div>
  );
}

export default Card;
