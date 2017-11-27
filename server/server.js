var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var calculate = require('./routes/calculate.js');

app.use(bodyParser.urlencoded({ extended: true }));  // middleware

app.use('/calculate', calculate);

// express static file serving - public is the folder name
app.use(express.static('server/public'));

// Start up our server
app.listen(port, function(){
  console.log('listening on port', port);
});




// only send objects, arrays, or statuses from client to server or vise versa
// if you're dealing with req and res, it should be in a route. Otherwise, it should be a module.
// typically, .get sends back objects and arrays, and .post sends back statuses