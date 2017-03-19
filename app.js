// https://zellwk.com/blog/crud-express-mongodb/

const express = require('express');
const app = express();

const port = 5000;

// app.use allows us to setup some middleware
// use these by Express, before anything else and serve these first if exists.  if not, then go to the routes.
app.use(express.static('public'));
app.use(express.static('src/views'))


app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/books', function(req, res) {
    res.send("Hello Books");
});

app.get('/todo', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/demo', function(req, res) {
    res.sendFile(__dirname + '/views/material-kit-master/index.html');
})


app.listen(port, function(err) {
    console.log("running server on port: " + port);
});