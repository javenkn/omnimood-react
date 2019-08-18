import React from 'react';
import geoData from '../../map-data/world-50m.json';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';

export default React.memo(
  ({
    handleCountryHover,
    handleGeographyClick,
    tweets,
    zoom,
    center,
    countryCode,
    disableOptimization,
  }) => (
    <div className='map'>
      <ComposableMap
        style={{ width: '100%', height: '100%' }}
        projectionConfig={{ scale: 175 }}
      >
        <ZoomableGroup disablePanning center={center} zoom={zoom}>
          <Geographies
            geography={geoData}
            disableOptimization={disableOptimization}
          >
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={`${geography.properties.ABBREV}-${i}`}
                  style={{
                    default: {
                      fill:
                        countryCode === geography.properties.ISO_A2
                          ? '#355179'
                          : '#0d1520',
                      outline: 'none',
                    },
                    hover: {
                      fill: '#355179',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#355179',
                      outline: 'none',
                    },
                  }}
                  geography={geography}
                  projection={projection}
                  onMouseEnter={handleCountryHover}
                  onClick={handleGeographyClick}
                />
              ))
            }
          </Geographies>
          <Markers>
            {tweets.map((tweet, i) => (
              <Marker key={i} marker={tweet.coordinateData}>
                <text className='marker__emoji'>{tweet.emoji}</text>
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  ),
);
