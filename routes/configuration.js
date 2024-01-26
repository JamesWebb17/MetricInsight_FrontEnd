let express = require('express');
let fs = require('fs');
let router = express.Router();


/* GET configuration page. */
router.get('/', async function(req, res, next) {

    fs.readFile('../MetricInsightConfiguration.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return;
        }

        // Analyser le JSON
        const my_config = JSON.parse(data);
        console.log(my_config);

    res.render('configuration', { my_config: JSON.stringify(my_config) });
    });

});

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

/* POST configuration page. */
router.post('/save_configuration', async function(req, res, next) {
    const jsonString = JSON.stringify(req.body, null, 2);
    console.log(jsonString);
    // Code de traitement de la sauvegarde de configuration...

    fs.writeFileSync('../MetricInsightConfiguration.json', jsonString, 'utf-8');
    // Redirection vers la page d'accueil après la sauvegarde réussie
    res.redirect('/');
});


module.exports = router;
