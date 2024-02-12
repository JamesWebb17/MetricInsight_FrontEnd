let express = require('express');
let router = express.Router();
let path = require('path');
const {json} = require("express");

let adresseIP = "http://10.0.0.10:3001/";


/* get startMetricInsight page. */
router.get('/', function(req, res, next) {
    console.log('startMetricInsight');
    fetch(adresseIP + 'api/hello', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify('ok'),
    }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la requête fetch :', error);
        })
});

module.exports = router;
