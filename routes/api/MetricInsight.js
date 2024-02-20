/** Express router for
 * @module routes/api/MetricInsight
 * @requires express
 * @requires path
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
 * config module
 * @const
 */
let config = require('../../bin/config');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace api/MetricInsight
 */
let router = express.Router();

/**
 * Route for stopping MetricInsight
 * @name /stop
 * @function
 * @memberof module:routes/api/MetricInsight~api/MetricInsight
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/stop', function(req, res, next) {
    let IP_address_backend = config.IP_adresse_Backend + ':' + config.Port_Backend;
    stopMetricInsight(IP_address_backend)
        .then(success => {
            res.json({ status: success, message: 'MetricInsight stopped successfully' });
            console.log('MetricInsight stopped successfully:', success);
        })
        .catch(error => {
            console.error('Error stopping MetricInsight:', error);
        });
});


/**
 * Route for starting MetricInsight
 * @name /start
 * @function
 * @memberof module:routes/api/MetricInsight~api/MetricInsight
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/start', function(req, res, next) {
    let IP_address_backend = config.IP_adresse_Backend + ':' + config.Port_Backend;
    console.log('IP_address_backend:', IP_address_backend);
    try {
        const bodyString = JSON.stringify(req.body);
        const My_config = JSON.parse(bodyString);
        startMetricInsight(IP_address_backend , My_config)
            .then(success => {
                res.json({ status: success, message: 'MetricInsight started successfully' });
                console.log('MetricInsight started successfully:', success);
            })
            .catch(error => {
                console.error('Error starting MetricInsight:', error);
            });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});


/**
 * Route for getting data from MetricInsight
 * @name /get_data/:name
 * @function
 * @memberof module:routes/api/MetricInsight~api/MetricInsight
 * @inner
 * @param {string} name - Name of the data to get
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/get_data/:name', async function(req, res, next) {
    let IP_address_backend = config.IP_adresse_Backend + ':' + config.Port_Backend;
    let name = req.params.name;

    // Configuration des en-têtes pour SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Logique de génération d'événements
    const intervalId = setInterval(async () => {
        try {
            let data = await getData(IP_address_backend, name);

            // If the data is too long (> config.graphics.point_per_display), divide it into chunks for display
            if (data.data.length > config.graphics.point_per_display) {
                const chunkSize = Math.ceil(data.data.length / config.graphics.point_per_display);

                // Diviser la liste en morceaux de taille chunkSize
                let dividedList= [];
                for (let i = 0; i < data.data.length; i += chunkSize) {
                    const chunk = data.data.slice(i, i + chunkSize);
                    dividedList.push(calculerMoyenneColonnes(chunk));
                }
                data.data = dividedList;
            }
            if (data.running) {
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            } else {
                res.write(`data: ${JSON.stringify(data)}\n\n`);
                clearInterval(intervalId);
                res.end();
            }
        } catch (error) {
            clearInterval(intervalId);
            res.end();
            console.error('Error getting data:', error);
        }
    }, 1000);
});


/**
 * Route for saving data from MetricInsight
 * @name /save_data:name
 * @function
 * @memberof module:routes/api/MetricInsight~api/MetricInsight
 * @inner
 * @param {string} name - Name of the data to save
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/save_data:name', function(req, res, next) {
    let IP_address_backend = config.IP_adresse_Backend + ':' + config.Port_Backend;
    let name = req.params.name;
    res.json({ status: true, message: 'Data saved successfully' });
    console.log(config.data);

});

/**
 * function to get data from MetricInsight
 * @name getData
 * @function getData
 * @param {string} IP_address_backend
 * @param {string} name
 * @returns {Promise<unknown>}
 */
function getData(IP_address_backend, name) {
    return new Promise((resolve, reject) => {
        fetch(`http://${IP_address_backend}/MetricInsight/get_data/${name}`)
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject('Error getting data');
                }
            })
            .catch(error => {
                reject('Error getting data', error);
            });
    });
}

/**
 * function to start MetricInsight
 * @name startMetricInsight
 * @function startMetricInsight
 * @param {string} IP_address_backend
 * @param {Object} config
 * @returns {Promise<unknown>}
 */
function startMetricInsight(IP_address_backend, config) {
    return new Promise((resolve, reject) => {
        fetch(`http://${IP_address_backend}/MetricInsight/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config),
        })
            .then(response => {
                if (response.ok) {
                    resolve(true); // La requête est réussie, renvoie true
                } else {
                    reject(false); // La requête a échoué, renvoie false
                }
            })
            .catch(error => {
                reject(false); // Erreur lors de la requête, renvoie false
            });
    });
}

/**
 * function to stop MetricInsight
 * @name stopMetricInsight
 * @function stopMetricInsight
 * @param {string} IP_address_backend
 * @returns {Promise<unknown>}
 */
function stopMetricInsight(IP_address_backend) {
    return new Promise((resolve, reject) => {
        fetch(`http://${IP_address_backend}/MetricInsight/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    resolve(true); // La requête est réussie, renvoie true
                } else {
                    reject(false); // La requête a échoué, renvoie false
                }
            })
            .catch(error => {
                reject(false); // Erreur lors de la requête, renvoie false
            });
    });
}

/**
 * function to calculate the average of columns. It's use for limit the number of points to display
 * @requires bin/config.graphics.point_per_display
 * @name calculerMoyenneColonnes
 * @function calculerMoyenneColonnes
 * @param {Array} liste
 * @returns {Array}
 */
function calculerMoyenneColonnes(liste) {
    if (liste.length === 0 || liste[0].length === 0) {
        return []; // La liste est vide, la moyenne par colonne est un tableau vide
    }

    const nombreColonnes = liste[0].length;

    // Initialiser un tableau pour stocker les moyennes par colonne
    const moyennesColonnes = new Array(nombreColonnes).fill(0);

    // Calculer la somme de chaque colonne
    for (let colonne = 0; colonne < nombreColonnes; colonne++) {
        for (let ligne = 0; ligne < liste.length; ligne++) {
            moyennesColonnes[colonne] += liste[ligne][colonne];
        }
        moyennesColonnes[colonne] /= liste.length; // Calculer la moyenne pour chaque colonne
    }

    return moyennesColonnes;
}

module.exports = router;