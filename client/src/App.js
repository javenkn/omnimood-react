import React, { useState, useEffect, useCallback } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';
import flagEmojis from './map-data/flag-emoji.json';
import Map from './components/Map';

function App() {
  const [country, setCountry] = useState('');
  const handleCountryHover = useCallback(geography => {
    setCountry(geography.properties.NAME_EN);
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
      <h1>{`${country} ${flagEmojis[country]}`}</h1>
      <Map handleCountryHover={handleCountryHover} />
    </div>
  );
}

export default App;
