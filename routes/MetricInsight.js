var express = require('express');
var router = express.Router();
var path = require('path');

/* get startMetricInsight page. */
router.get('/', function(req, res, next) {
    console.log("my_config");
    res.sendFile(path.join(__dirname, '../views/MetricInsight.html'));
});

module.exports = router;