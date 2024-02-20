/** Express router for
 * @module routes/configuration
 * @requires express
 * @requires path
 * @requires fs
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
 * fs module
 * @const
 */
let fs = require('fs');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace configuration
 */
let router = express.Router();

/**
 * Route serving configuration root.
 * @name /
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', async function(req, res, next) {

    fs.readFile('../MetricInsightConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }

        // Analyser le JSON
        const my_config = JSON.parse(data);

    res.render('configuration', { my_config: JSON.stringify(my_config) });
    });

});

/**
 * Route for getting the configuration file.
 * @name /get/MetricInsightConfiguration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/get/MetricInsightConfiguration.json', async function(req, res, next) {
    fs.readFile('../MetricInsightConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }
        const my_config = JSON.parse(data);
        res.json(my_config);
    });
});

/**
 * Route for saving the configuration file.
 * @name /save_configuration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/save_configuration', async function(req, res, next) {
    const jsonString = JSON.stringify(req.body, null, 2);

    fs.writeFileSync('../MetricInsightConfiguration.json', jsonString, 'utf-8');
    // Redirection vers la page d'accueil après la sauvegarde réussie
    res.redirect('/');
});

module.exports = router;
