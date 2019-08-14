import React from 'react';
import geoData from '../../map-data/world-50m.json';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import flagEmojis from '../../map-data/flag-emoji.json';

export default React.memo(({ handleCountryHover }) => {
  console.log('render');
  return (
    <div>
      <ComposableMap>
        <ZoomableGroup disablePanning>
          <Geographies geography={geoData}>
            {(geographies, projection) => {
              console.log(geographies.reduce((acc, geography) => {
                return {
                  ...acc,
                  [geography.properties.ISO_A3]: {
                    name: geography.properties.NAME_LONG,
                    flag: flagEmojis[geography.properties.NAME_LONG] || ''
                  }
                }
              }, {}));
              return geographies.map((geography, i) => (
                <Geography
                  key={`${geography.properties.ABBREV}-${i}`}
                  style={{
                    default: {
                      fill: '#ECEFF1',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: 'red',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#ECEFF1',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                  }}
                  geography={geography}
                  projection={projection}
                  onMouseEnter={handleCountryHover}
                />
              ))
            }
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});
