var express = require("express");
var router = express.Router();
var history = require('../modules/history.js');

var calculateData;
var data_to_store;

// does the math and stores it in calculateData and history
router.post('/', function(req, res) {
   history.push(req.body);
    if (req.body.operation === '+') {
        calculateData = Number(req.body.inputOne) + Number(req.body.inputTwo);
    } else if (req.body.operation === '-') {
        calculateData = req.body.inputOne - req.body.inputTwo;
    } else if (req.body.operation === '*') {
        calculateData = req.body.inputOne * req.body.inputTwo;
    } else if (req.body.operation === '/') {
        calculateData = req.body.inputOne / req.body.inputTwo;
    }

    res.sendStatus(200);
});

// sends back calculateData
router.get('/', function(req, res) {
    res.send({number: calculateData});
});

// clears calculateData
router.get('/clear', function(req, res) {
    calculateData = undefined;
    res.sendStatus(200);
});

// sends history back to client
router.get('/history', function(req, res) {
    console.log('returning history array:', history);
    res.send(history);
});

// adds the answer to the latest object in the history array
router.post('/answer', function(req, res) {
    history[history.length - 1].answer = req.body.answer;

    res.sendStatus(200);
 });

module.exports = router;