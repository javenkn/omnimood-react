import React from 'react';
import geoData from '../../map-data/world-50m.json';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

export default React.memo(({ handleCountryHover }) => {
  console.log('render');
  return (
    <div style={{ height: '100%', paddingBottom: '10px' }}>
      <ComposableMap style={{ width: '100%', height: '100%' }}>
        <ZoomableGroup disablePanning>
          <Geographies geography={geoData}>
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={`${geography.properties.ABBREV}-${i}`}
                  style={{
                    default: {
                      fill: '#ECEFF1',
                      stroke: '#1a237e',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: 'red',
                      stroke: '#1a237e',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#ECEFF1',
                      stroke: '#1a237e',
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
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});
