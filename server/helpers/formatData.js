const parseEmoji = require('./parseEmoji');

const formatData = data => {
  const { coordinates } = data.place.bounding_box;
  return {
    coordinates: coordinates[0][0],
    text: parseEmoji(data.text),
  };
};

module.exports = formatData;
