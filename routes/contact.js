/** Express router for
 * @module routes/contact
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
 * @namespace contact
 */
let router = express.Router();

/**
 * Route serving contact root.
 * @name /
 * @function
 * @memberof module:routes/contact~contact
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

/**
 * Route serving contact root.
 * @name /send_message
 * @function
 * @memberof module:routes/contact~contact
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/send_message', function(req, res, next) {
    console.log(req.body);
    res.sendFile(path.join(__dirname, '../views/mainPage.html'));
});

module.exports = router;
