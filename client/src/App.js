import React, { useState, useEffect, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
import { geoPath } from 'd3-geo';
import { geoTimes } from 'd3-geo-projection';

import './App.css';
import countryData from './map-data/country-data.json';
import Map from './components/Map';

function App() {
  const [countryCode, setCountryCode] = useState('');
  const [tweets, setTweets] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([20, 2]);
  const [disableOptimization, setDisableOptimization] = useState(false);

  useEffect(() => {
    if (disableOptimization) {
      setDisableOptimization(false);
    }
  }, [disableOptimization]);

  const handleCountryHover = geography => {
    setCountryCode(geography.properties.ISO_A3);
  };

  const projection = () => {
    return geoTimes()
      .translate([800, 450])
      .scale(160);
  };

  const handleGeographyClick = geography => {
    // geography looks something like this:
    // { type: "Feature",  properties: {...}, geometry: {...} }
    const path = geoPath().projection(projection());
    const centroid = projection().invert(path.centroid(geography));
    // zoom === 2 handles the case when user wants to zoom back out
    setZoom(zoom => (zoom === 2 ? 1 : 2));
    setCenter(() => (zoom === 2 ? [20, 2] : centroid));
    setDisableOptimization(true);
    setCountryCode(geography.properties.ISO_A3);
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
      <h1 className='app__title'>OMNIMOOD</h1>
      {countryCode && (
        <h1 className='country__title'>{`${countryData[countryCode].name} ${
          countryData[countryCode].flag
        }`}</h1>
      )}
      <Map
        handleCountryHover={handleCountryHover}
        handleGeographyClick={handleGeographyClick}
        tweets={tweets}
        zoom={zoom}
        center={center}
        countryCode={countryCode}
        disableOptimization={disableOptimization}
      />
    </div>
  );
}

export default App;
