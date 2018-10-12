const express = require('express'),
      router = express.Router(),
      MongoClient = require('mongodb').MongoClient,
      ObjectID = require('mongodb').ObjectID;

// Database name
const dbName = 'mean';

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if(err) return console.log(err);

    closure(client.db(dbName));
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
    .find()
    .toArray()
    .then((users) => {
      response.data = users;
      res.json(response);
    })
    .catch((err) => {
      sendError(err, res);
    });
  });
});

module.exports = router;
