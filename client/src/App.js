import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';
import Map from './components/Map';

function App() {
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
      <Map />
    </div>
  );
}

export default App;
