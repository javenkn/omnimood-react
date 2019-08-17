const parseEmoji = require('./parseEmoji');

const formatData = data => {
  const { coordinates } = data.place.bounding_box;
  return {
    coordinateData: { coordinates: coordinates[0][0] },
    countryCode: data.place.country_code,
    emoji: parseEmoji(data.text),
  };
};

module.exports = formatData;
