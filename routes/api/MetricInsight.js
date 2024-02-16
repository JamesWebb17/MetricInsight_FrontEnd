let express = require('express');
let router = express.Router();

const WebSocket = require('ws');
let config = require('../../bin/config');


/* POST route for stop MetricInsight */
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

/* POST route for start MetricInsight */
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

// Express route pour démarrer le SSE
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
            console.log('data:', data);

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

module.exports = router;