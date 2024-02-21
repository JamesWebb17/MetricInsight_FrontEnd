/** Express router for
 * @module routes/configuration
 * @requires express
 * @requires path
 * @requires fs
 * @requires bin/config
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
 * config module
 * @const
 */
let config = require('../bin/config');

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

    fs.readFile('../MetricInsightMonitoringConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }

        // Analyser le JSON
        const my_config = JSON.parse(data);

    res.render('configuration', { my_config: JSON.stringify(my_config) , graphics: JSON.stringify(config.graphics)});
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
router.get('/get/MetricInsightMonitoringConfiguration', async function(req, res, next) {
    fs.readFile('../MetricInsightMonitoringConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }
        const my_config = JSON.parse(data);
        res.json(my_config);
    });
});

/**
 * Route for saving the monitoring configuration file.
 * @name /save_monitoring_configuration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/save_monitoring_configuration', async function(req, res, next) {
    const jsonString = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('../MetricInsightMonitoringConfiguration.json', jsonString, 'utf-8');
    // Redirection vers la page d'accueil après la sauvegarde réussie
    res.redirect('/');
});

/**
 * Route for saving the display configuration file.
 * @name /save_display_configuration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/save_display_configuration', async function(req, res, next) {
    const jsonString = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('../MetricInsightDisplayConfiguration.json', jsonString, 'utf-8');

    if (req.body.meanCheckbox) {
        config.graphics.mean_display = req.body.meanInput;
    }
    // Redirection vers la page d'accueil après la sauvegarde réussie
    res.redirect('/');
});

module.exports = router;
