const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

// http
const http = require('http')
// database
require('../db/config');
// router
const { router } = require('./router');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', router);

app.listen(PORT, err => {
  if (err) {
    console.log('server error not listening');
  }
  console.log('listening to PORT ', PORT);
});
