var express = require('express');
var router = express.Router();
var path = require('path');

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

/* POST contact send message page. */
router.post('/send_message', async function (req, res, next) {
    console.log(req.body);

    await axios.post('http://127.0.0.1:5000/api/my_function', req.body);

    res.sendFile(path.join(__dirname, '../views/mainPage.html'));
});

module.exports = router;
