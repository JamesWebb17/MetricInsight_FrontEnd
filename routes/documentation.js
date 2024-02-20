/** Express router for
 * @module routes/documentation
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
 * @namespace documentation
 */
let router = express.Router();

/**
 * Route serving contact root.
 * @name /
 * @function
 * @memberof module:routes/documentation~documentation
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/documentation.html'));
});

/**
 * Route serving frontend documentation page root.
 * @name /frontend
 * @function
 * @memberof module:routes/documentation~documentation
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/frontend', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/Documentation/FrontEnd/index.html'));
});
module.exports = router;

/**
 * Route serving backend documentation page root.
 * @name /backend
 * @function
 * @memberof module:routes/documentation~documentation
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/backend', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/Documentation/BackEnd/index.html'));
});
module.exports = router;
