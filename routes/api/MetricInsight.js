/** Express router for
 * @module routes/api/MetricInsight
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
            await saveData(name, new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate(), data.data);

            // If the data is too long (> config.graphics.point_per_display), divide it into chunks for display
            if (data.data.length > config.graphics.mean_display) {
                const chunkSize = Math.ceil(data.data.length / config.graphics.mean_display);

                // Divide the list into chunks
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
 * @name /save_data/:name
 * @function
 * @memberof module:routes/api/MetricInsight~api/MetricInsight
 * @inner
 * @param {string} name - Name of the data to save
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/save_data/:name', function(req, res, next) {
    let name = req.params.name;

    let folderPath = config.saving.default_path + config.saving.default_file_name;
    let fileName = `${config.saving.default_file_name}_${name}`;

    if (config.saving.change_file_name) {
        folderPath = config.saving.default_path + config.saving.user_file_name;
        fileName = `${config.saving.user_file_name}_${name}`;

    }

    if (name === 'undefined') {
        res.status(400).send('Missing name parameter');
        return;
    }

    let date = new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate();

    let filePath = `${folderPath}/${date}_${name}.csv`;

    // Vérifiez si le fichier existe
    if (fs.existsSync(filePath)) {
        // Configurez les en-têtes de la réponse
        res.set('Content-disposition', `attachment; filename=${encodeURI(fileName)}`);
        res.set('Content-Type', 'application/octet-stream'); // Définissez le type de contenu en fonction du type de fichier

        // Lisez le fichier et pipez-le dans la réponse
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier :', err);
            } else {
                console.log('Fichier supprimé avec succès.');
            }
        });
    } else {
        // Si le fichier n'existe pas, renvoyez une réponse 404
        res.status(404).send('Fichier non trouvé');
    }

});

/**
 * function to get data from MetricInsight
 * @name getData
 * @function getData
 * @param {string} IP_address_backend
 * @param {string} name
 * @returns {Promise<unknown>}
 */
async function getData(IP_address_backend, name) {
    try {
        const response = await fetch(`http://${IP_address_backend}/MetricInsight/get_data/${name}`);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error getting data');
        }
    } catch (error) {
        throw new Error('Error getting data', error);
    }
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
                    resolve(true); // If the request is successful, return true
                } else {
                    reject(false); // If the request fails, return false
                }
            })
            .catch(error => {
                reject(false); // Error during the request, return false
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
                    resolve(true); // If the request is successful, return true
                } else {
                    reject(false); // If the request fails, return false
                }
            })
            .catch(error => {
                reject(false); // Error during the request, return false
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

/**
 * function to save data
 * @name saveData
 * @param {string} name
 * @param {string} folderName
 * @param {Array} newData
 * @return {Promise<unknown>}
 */
function saveData(name, folderName, newData) {

    let folderPath = config.saving.default_path + config.saving.default_file_name;

    if (config.saving.change_file_name) {
        folderPath = config.saving.default_path + config.saving.user_file_name;
    }

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
        // If not, create it
        fs.mkdirSync(folderPath);
        console.log(`Le dossier "${folderPath}" a été créé.`);
    }

    let date = new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate();
    let filePath = `${folderPath}/${date}_${name}.csv`;

    if (newData.length === 0) {
        //console.log('No data to save');
    }
    else {
        let csvString = newData.map(row => row.join(',')).join('\n') + '\n';

        // Add the new data to the file
        try {
            fs.writeFileSync(filePath, csvString, {flag: 'a+'}, 'utf-8');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

}

module.exports = router;