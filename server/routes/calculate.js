var express = require("express");
var router = express.Router();

var calculateData;

router.post('/', function(req,res) {
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

router.get('/', function(req, res) {
    res.send({number: calculateData});
});

router.get('/clear', function(req,res) {
    calculateData = undefined;
    res.sendStatus(200);
});

module.exports = router;