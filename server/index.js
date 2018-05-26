const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

// http
const http = require('http')
// database
// require('../db/config');

// router
// const { router } = require('./router')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static(path.join(__dirname, '../static')));

// app.use('/api', router);

app.listen(PORT, err => {
  if (err) {
    console.log('server error not listening');
  }
  console.log('listening to PORT ', PORT);
});

app.post('/user', (req, res) => {
  console.log(req.body.word);
  var clientId = "FREE_TRIAL_ACCOUNT";
  var clientSecret = "PUBLIC_SECRET";


  var options = {
    hostname: "api.whatsmate.net",
    port: 80,
    path: "/v1/translation/translate",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WM-CLIENT-ID": clientId,
      "X-WM-CLIENT-SECRET": clientSecret,
      "Content-Length": Buffer.byteLength(JSON.stringify(req.body))
    }
  };

  var request = new http.ClientRequest(options);
  request.end(JSON.stringify(req.body));

  request.on('response', function (response) {
    console.log('Status code: ' + response.statusCode);
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log('Translated text:');
      console.log(chunk);
    });
  })
})


// #!/usr/bin/env node

// When you have your own Client ID and secret, put down their values here:
// var clientId = "FREE_TRIAL_ACCOUNT";
// var clientSecret = "PUBLIC_SECRET";
//
// var fromLang = "en";
// var toLang = "tl";
// var text = "Let's have some fun!";
//
// var jsonPayload = JSON.stringify({
//     fromLang: fromLang,
//     toLang: toLang,
//     text: text
// });
//
// var options = {
//     hostname: "api.whatsmate.net",
//     port: 80,
//     path: "/v1/translation/translate",
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "X-WM-CLIENT-ID": clientId,
//         "X-WM-CLIENT-SECRET": clientSecret,
//         "Content-Length": Buffer.byteLength(jsonPayload)
//     }
// };
//
// var request = new http.ClientRequest(options);
// request.end(jsonPayload);
//
// request.on('response', function (response) {
//     console.log('Status code: ' + response.statusCode);
//     response.setEncoding('utf8');
//     response.on('data', function (chunk) {
//         console.log('Translated text:');
//         console.log(chunk);
//     });
// });
