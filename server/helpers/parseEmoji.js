const parseEmoji = text => {
  const emojisToFind = {
    '😀': 'happy',
    '😂': 'joy',
    '😠': 'mad',
    '😡': 'angry',
    '😭': 'crying',
    '😢': 'sad',
  };
  const regex = /\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g;
  const matches = text.match(regex);
  if (matches) {
    // finds first emoji that is in the emojisToFind obj
    return matches.find(emoji => emojisToFind[emoji]) || '';
  }
  return '';
};

module.exports = parseEmoji;
