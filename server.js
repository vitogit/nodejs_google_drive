var fs = require('fs');
var readline = require('readline');

var gapi = require('googleapis');

var config = require('./config');
var express = require("express");
var app = express();

console.log('config'+JSON.stringify(config))
app.use(express.static(__dirname + '/src'));

var server = app.listen(config.PORT, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
//
// function authorize(callback) {
//   var auth = new googleAuth();
//   var oauth2Client = new auth.OAuth2(config.CLIENT_ID, config.SECRET_ID, redirectUrl);
//
//   // Check if we have previously stored a token.
//   if (config.TOKEN) {
//     oauth2Client.setCredentials(tokens);
//     callback(oauth2Client);
//   } else {
//     getNewToken(oauth2Client, callback);
//   }
// }

var OAuth2 = gapi.auth.OAuth2;
var oauth2Client = new OAuth2(config.CLIENT_ID, config.SECRET_ID, "http://localhost:4000/oauthcallback");

var scopes = [
  'https://www.googleapis.com/auth/drive.file'
];

var authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

app.get("/authUrl", function(req, res) {
  res.send(authUrl);
});

app.get("/tokens", function(req, res) {
  var code = req.query.code;

  oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log('get token error__'+JSON.stringify(err));
      res.send(err);
      return;
    }

    console.log('tokens____'+JSON.stringify(tokens));
    oauth2Client.setCredentials(tokens);
    res.send(tokens);
  });
});

app.get("/listFiles", function(req, res) {
  listFiles(function(err, response){
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    res.send(JSON.stringify(files));
  })
});

app.get("/createFile", function(req, res) {
  createFile('test1', function(err,result){
        if(err) console.log(err) 
        else res.send(JSON.stringify(result));

    })
});

var drive = gapi.drive({ version: 'v3', auth: oauth2Client });


function listFiles(callback) {
  drive.files.list({
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, callback);
}


function createFile(filename, callback) {
  drive.files.create({
    resource: {
      name: filename,
      mimeType: 'text/plain'
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World'
    }
  }, callback);
}
