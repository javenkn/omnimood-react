import React from 'react';
import geoData from '../../map-data/ne_10m_admin_0_countries.json';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

export default function Map({ handleCountryHover }) {
  return (
    <div>
      <ComposableMap>
        <ZoomableGroup disablePanning>
          <Geographies geography={geoData}>
            {(geographies, projection) =>
              geographies.map((geography, i) => (
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
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
