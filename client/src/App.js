import React, { useState, useEffect, useCallback } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';
import countryData from './map-data/country-data.json';
import Map from './components/Map';

function App() {
  const [countryCode, setCountryCode] = useState('');
  const handleCountryHover = useCallback(geography => {
    setCountryCode(geography.properties.ISO_A3);
  }, []);
  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001');
    socket.on('connect_error', () => socket.close());
    socket.on('FromAPI', data => console.log(data));
    socket.on('disconnect', () => socket.close());
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div className='App'>
      Hello
      {countryCode && (
        <h1>{`${countryData[countryCode].name} ${
          countryData[countryCode].flag
        }`}</h1>
      )}
      <Map handleCountryHover={handleCountryHover} />
    </div>
  );
}

export default App;
