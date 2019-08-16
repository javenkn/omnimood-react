import React, { useState, useEffect, useCallback } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';
import countryData from './map-data/country-data.json';
import Map from './components/Map';

function App() {
  const [countryCode, setCountryCode] = useState('');
  const [tweets, setTweets] = useState([]);
  const handleCountryHover = useCallback(geography => {
    setCountryCode(geography.properties.ISO_A3);
  }, []);
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
      <h1 className='app__title'>OMNIMOOD</h1>
      {countryCode && (
        <h1 className='country__title'>{`${countryData[countryCode].name} ${
          countryData[countryCode].flag
        }`}</h1>
      )}
      <Map handleCountryHover={handleCountryHover} tweets={tweets} />
    </div>
  );
}

export default App;
