import React from 'react';
import countryData from '../../map-data/country-data-iso-a2.json';

export default function({ newestTweet, tweets, countryCode }) {
  return (
    <div className='country__info'>
      {tweets.length ? (
        <h1 className='country__mood'>
          Tweet Mood from {countryData[newestTweet.countryCode].name}{' '}
          {countryData[newestTweet.countryCode].flag}
          {': '}
          {newestTweet.emoji}
        </h1>
      ) : null}
      {countryCode && (
        <h1 className='country__title'>{`${countryData[countryCode].name} ${
          countryData[countryCode].flag
        }`}</h1>
      )}
    </div>
  );
}
