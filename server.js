const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      http = require('http'),
      app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
console.log(path.join(__dirname, 'dist'));

// API location
app.use('/api', api);

// Send all other request to the angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

const server =  http.createServer(app);

server.listen(port, () => console.log(`Running on localhost: ${port}`));

