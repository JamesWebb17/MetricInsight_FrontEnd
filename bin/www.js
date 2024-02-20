#!/usr/bin/env node

/**
 * @file www.js
 * @module bin/www
 * @description This file is the main file of the application. It is used to define the server and its configuration.
 * @author Simon Faucher
 * @date 2024-02-20
 * @version 1.0
 * @copyright Copyright (c) 2024 MetricInsight  All rights reserved.
 */


/**
 * Module dependencies.
 * @requires os
 * @requires debug
 * @requires http
 * @requires dotenv
 * @requires cors
 */
let os = require('os');
let debug = require('debug')('webapp:server');
let http = require('http');
let dotenv = require('dotenv').config();
let cors = require('cors');


/**
 * @type {*|Express|{}}
 */
let app = require('../app');

/**
 * @type {{Port_Frontend: number, IP_adresse_Backend: number, graphics: {point_per_display: number}, Port_Backend: number, IP_adresse_Frontend: number}|{}}
 */
let config = require('./config');


/**
 * Get network interfaces information
 * @type {NodeJS.Dict<NetworkInterfaceInfo[]>}
 */
const networkInterfaces = os.networkInterfaces();

// Trouver l'adresse IP de la première interface réseau (en supposant qu'il s'agisse de l'interface principale)
const addresses = networkInterfaces['eth0'] // Adapter les noms des interfaces selon votre système
let ipAddress = null;
if (addresses) {
    for (const address of addresses) {
        if (address.family === 'IPv4') {
            ipAddress = address.address;
            break;
        }
    }
}

console.log('Adresse IP de la machine :', ipAddress);

/**
 * Use CORS to allow all origins
 */
app.use(cors());

/**
 * Get port from environment and store in Express or/and in config.js
 */
config.Port_Frontend = normalizePort(process.env.FRONTEND_PORT || '3000');
app.set('port', config.Port_Frontend);

/**
 * Get IP adress for the frontend and the backend
 */
config.IP_adresse_Frontend = process.env.FRONTEND_IP || ipAddress ;
config.IP_adresse_Backend = process.env.BACKEND_IP || 'localhost';

/**
 * Get the port for the backend
 */
config.Port_Backend = normalizePort(process.env.BACKEND_PORT || '3001');
console.log('Adresse IP du backend :', config.IP_adresse_Backend);

/**
 * Create HTTP server.
 * @description This function is used to create the server
 */
let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.Port_Frontend, config.IP_adresse_Frontend ,() => {
  console.log(`Server is running at http://${config.IP_adresse_Frontend }:${config.Port_Frontend}/`);
    });
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @description This function is used to normalize the port
 * @param {string} val
 * @returns {number|*|boolean}
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @description This function is used to handle the error
 * @param {Error} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof config.Port_Frontend === 'string'
      ? 'Pipe ' + config.Port_Frontend
      : 'Port ' + config.Port_Frontend ;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * @description This function is used to handle the listening event
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}