/** Express router for
 * @module routes/MetricInsight
 * @requires express
 * @requires path
 */

/**
 * express module
 * @const
 */
let express = require('express');

/**
 * path module
 * @const
 */
let path = require('path');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace MetricInsight
 */
let router = express.Router();


/**
 * Route serving MetricInsight root.
 * @name /
 * @function
 * @memberof module:routes/MetricInsight~MetricInsight
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/MetricInsight.html'));
});

module.exports = router;
