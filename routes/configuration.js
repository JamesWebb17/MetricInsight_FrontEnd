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
const {json} = require("express");

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

    fs.readFile('../UserConfigurationFiles/MetricInsightMonitoringConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }

        // Analyser le JSON
        const my_config = JSON.parse(data);

    res.render('configuration', { my_config: JSON.stringify(my_config) , graphics: JSON.stringify(config.graphics), saving: JSON.stringify(config.saving)});
    });

});

/**
 * Route for getting the monitoring configuration file.
 * @name /get/MetricInsightMonitoringConfiguration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/get/MetricInsightMonitoringConfiguration', async function(req, res, next) {
    fs.readFile('../UserConfigurationFiles/MetricInsightMonitoringConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }
        const my_config = JSON.parse(data);
        res.json(my_config);
    });
});

/**
 * Route for getting the saving configuration file.
 * @name /get/MetricInsightSavingConfiguration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/get/MetricInsightSavingConfiguration', async function(req, res, next) {
    fs.readFile('../UserConfigurationFiles/MetricInsightSavingConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }
        const my_config = JSON.parse(data);
        res.json(my_config);
    });
});

/**
 * Route for getting the display configuration file.
 * @name /get/MetricInsightDisplayConfiguration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/get/MetricInsightDisplayConfiguration', async function(req, res, next) {
    fs.readFile('../UserConfigurationFiles/MetricInsightDisplayConfiguration.json', 'utf-8', (err, data) => {
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
    fs.writeFileSync('../UserConfigurationFiles/MetricInsightMonitoringConfiguration.json', jsonString, 'utf-8');

    // Update the configuration
    config.monitoring.frequency = req.body.FreqInput;
    config.monitoring.duration = req.body.IntervalInput;

    // Redirect to the home page after successful save
    res.redirect('/');
});

/**
 * Route for saving the saving configuration file.
 * @name /save_saving_configuration
 * @function
 * @memberof module:routes/configuration~configuration
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/save_saving_configuration', async function(req, res, next) {
    const jsonString = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('../UserConfigurationFiles/MetricInsightSavingConfiguration.json', jsonString, 'utf-8');

    if (req.body.saveCheckbox) {
        config.saving.change_file_name = true;
       config.saving.user_file_name = req.body.saveInput;
    }
    else {
        config.saving.change_file_name = false;
        config.saving.user_file_name = "";
        config.saving.default_file_name =new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate();

    }

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
    fs.writeFileSync('../UserConfigurationFiles/MetricInsightDisplayConfiguration.json', jsonString, 'utf-8');

    if (req.body.meanCheckbox) {
        config.graphics.mean_display = req.body.meanInput;
    }

    if (req.body.slidingWindowCheckbox) {
        config.graphics.sliding_window = true;
        config.graphics.sliding_window_size = req.body.slidingWindowInput;
    }
    // Redirection vers la page d'accueil après la sauvegarde réussie
    res.redirect('/');
});

module.exports = router;
