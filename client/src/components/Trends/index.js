import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './trends.css';

export default function() {
  const [trends, setTrends] = useState([]);
  const [trendTime, setTrendTime] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      setIsFetching(true);
      const res = await fetch('http://localhost:4001/twitter-trends');
      const trendsInfo = await res.json();
      setIsFetching(false);
      setTrendTime(new Date(trendsInfo.as_of).toLocaleString());
      setTrends(trendsInfo.trends);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  return (
    <div className='trends'>
      <div className='trends__text'>
        <h3>{`Worldwide Trends ${trendTime ? 'as of' : ''} ${trendTime ||
          ''}`}</h3>
        <FontAwesomeIcon
          className='refresh'
          icon={faSync}
          onClick={fetchTrends}
        />
      </div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ul className='trends__list'>
          {trends.map((trend, i) => (
            <li key={`trend-${i}`}>
              <a href={trend.url}>{trend.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
