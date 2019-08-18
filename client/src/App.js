import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { geoPath } from 'd3-geo';
import { geoTimes } from 'd3-geo-projection';

import Map from './components/Map';
import './App.css';
import CountryInfo from './components/CountryInfo';
import Trends from './components/Trends';

function App() {
  const [countryCode, setCountryCode] = useState('');
  const [tweets, setTweets] = useState([]);
  const [zoom, setZoom] = useState(false);
  const [center, setCenter] = useState([10, 0]);
  const [disableOptimization, setDisableOptimization] = useState(false);

  useEffect(() => {
    if (disableOptimization) {
      setDisableOptimization(false);
    }
  }, [disableOptimization]);

  const handleCountryHover = geography => {
    setCountryCode(geography.properties.ISO_A2);
  };

  const projection = () => {
    return geoTimes()
      .translate([800, 450])
      .scale(160);
  };

  /**
   * Click on a country -> zooms in
   * Click on a diff country (while zoomed) -> switches center (stays zoomed)
   * Click on same country (while zoomed) -> zooms out
   */
  const handleGeographyClick = geography => {
    // geography looks something like this:
    // { type: "Feature",  properties: {...}, geometry: {...} }
    const path = geoPath().projection(projection());
    const centroid = projection().invert(path.centroid(geography));
    setZoom(countryCode === geography.properties.ISO_A2 ? !zoom : true);
    setCenter(() =>
      countryCode === geography.properties.ISO_A2 ? [10, 0] : centroid,
    );
    setDisableOptimization(true);
    setCountryCode(geography.properties.ISO_A2);
  };

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001');
    socket.on('connect_error', () => socket.close());
    socket.on('FromAPI', data => setTweets(tweets => [...tweets, data]));
    socket.on('disconnect', () => socket.close());
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className='app'>
      <Trends />
      <Map
        handleCountryHover={handleCountryHover}
        handleGeographyClick={handleGeographyClick}
        tweets={tweets}
        zoom={zoom ? 2 : 1}
        center={center}
        countryCode={countryCode}
        disableOptimization={disableOptimization}
      />
      <h1 className='app__title'>OMNIMOOD</h1>
      <CountryInfo
        newestTweet={tweets.slice(-1)[0]}
        countryCode={countryCode}
        tweets={tweets}
      />
      {/* <div className='country__info'>
        {tweets.length ? (
          <h1 className='country__mood'>
            Tweet Mood from {countryData[tweets.slice(-1)[0].countryCode].name}{' '}
            {countryData[tweets.slice(-1)[0].countryCode].flag}
            {': '}
            {tweets.slice(-1)[0].emoji}
          </h1>
        ) : null}
        {countryCode && (
          <h1 className='country__title'>{`${countryData[countryCode].name} ${
            countryData[countryCode].flag
          }`}</h1>
        )}
      </div> */}
    </div>
  );
}

export default App;
