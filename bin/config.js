/**
 * @file config.js
 * @module bin/config
 * @description This file is used to define the configuration of the application.
 * @type {{Port_Frontend: number, IP_adresse_Backend: number, graphics: {point_per_display: number}, Port_Backend: number, IP_adresse_Frontend: number}}
 * @author Simon Faucher
 * @date 2024-02-20
 * @version 1.0
 * @copyright Copyright (c) 2024 MetricInsight  All rights reserved.
 */



module.exports = {

    /**
     * @description It is used to define the backend IP address
     * @default 127.0.0.0 : it's localhost
     * @type {string}
     */
    IP_adresse_Backend: "127.0.0.0",

    /**
     * @description It is used to define the frontend IP address
     * @default 127.0.0.0 : it's localhost
     * @type {string}
     */
    IP_adresse_Frontend: "127.0.0.0",

    /**
     * @description It is used to define the backend port
     * @default 3001
     * @type {number}
     */
    Port_Backend: 3001,

    /**
     * @description It is used to define the frontend port
     * @default 3000
     * @type {number}
     */
    Port_Frontend: 3000,

    /**
     * @description It is used to configure the graphics options
     */
    graphics:{
        /**
         * @description It is used to define the number of point per display
         * @default 10
         * @type {number}
         */
        mean_display: 1,
    },
};

