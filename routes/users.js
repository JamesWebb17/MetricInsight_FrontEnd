/** Express router for
 * @module routes/users
 * @requires express
 */

/**
 * express module
 * @const
 */
let express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace users
 */
let router = express.Router();

/**
 * Route serving user root.
 * @name /
 * @function
 * @memberof module:routes/users~users
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
