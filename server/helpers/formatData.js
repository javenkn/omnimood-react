const parseEmoji = require('./parseEmoji');

const formatData = data => {
  const { coordinates } = data.place.bounding_box;
  return {
    coordinateData: { coordinates: coordinates[0][0] },
    emoji: parseEmoji(data.text),
  };
};

module.exports = formatData;
