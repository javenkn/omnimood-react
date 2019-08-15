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
      <ComposableMap
        style={{ width: '100%', height: '100%' }}
        projectionConfig={{ scale: 185 }}
      >
        <ZoomableGroup disablePanning center={[20, 2]}>
          <Geographies geography={geoData}>
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={`${geography.properties.ABBREV}-${i}`}
                  style={{
                    default: {
                      fill: '#0d1520',
                      stroke: '#fff',
                      strokeWidth: 0.025,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#355179',
                      stroke: '#fff',
                      strokeWidth: 0.025,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#0d1520',
                      stroke: '#fff',
                      strokeWidth: 0.025,
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
