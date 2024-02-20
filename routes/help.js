/** Express router for
 * @module routes/help
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
 * @namespace help
 */
let router = express.Router();

/**
 * Route serving help root.
 * @name /
 * @function
 * @memberof module:routes/help~help
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/help.html'));
});

module.exports = router;
