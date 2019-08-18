const express = require('express');
const router = express.Router();
const client = require('../twitter');

router.get('/twitter-trends', (req, res) => {
  client.get('trends/place', { id: 1 }, function(error, tweets, response) {
    if (error) throw error;
    res.send(tweets[0]).status(200);
  });
});

module.exports = router;
