/** Express router for
 * @module routes/login
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
 * @namespace login
 */
let router = express.Router();

/**
 * Route serving login root.
 * @name /
 * @function
 * @memberof module:routes/login~login
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

module.exports = router;
