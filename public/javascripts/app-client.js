// app-client.js
document.addEventListener('DOMContentLoaded', function() {

    // Charger le head
    fetch('../views/partials/head.html')
        .then(response => response.text())
        .then(html => document.getElementById('head-placeholder').innerHTML = html);


    // Charger le header
    fetch('../views/partials/header.html')
        .then(response => response.text())
        .then(html => document.getElementById('header-placeholder').innerHTML = html);

    // Charger le footer
    fetch('../views/partials/footer.html')
        .then(response => response.text())
        .then(html => document.getElementById('footer-placeholder').innerHTML = html);
});
