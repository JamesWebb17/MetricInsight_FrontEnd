var express = require('express');
var router = express.Router();
var path = require('path');

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

/* POST contact send message page. */
router.post('/send_message', function(req, res, next) {
    console.log(req.body);
    res.sendFile(path.join(__dirname, '../views/mainPage.html'));
});

module.exports = router;
