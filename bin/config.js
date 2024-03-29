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
     * @description It is used to configure the monitoring options
     */
    monitoring: {
        /**
         * @description It is used to define the default frequence of the monitoring
         * @default 10
         * @type {number}
         */
        frequency: 10,

        /**
         * @description It is used to define the default duration of the monitoring
         * @default 10
         * @type {number}
         */
        duration: 10
    },

    /**
     * @description It is used to configure the graphics options
     */
    graphics:{
        /**
         * @description It is used to define the number of point per display
         * @default 10
         * @type {number}
         */
        mean_display: 10,

        /**
         * @description Defines whether the graphics window is sliding.
         * @default false
         * @type {boolean}
         */
        sliding_window: false,

        /**
         * @description Defines the size of the sliding window.
         * @default 10
         * @type {number}
         */
        sliding_window_size: 10,
    },

    /**
     * @description It is used to configure the saving options
     */
    saving: {
        /**
         * @description It is used to define the default path to save the configuration files
         * @default ../UserConfigurationFiles/
         * @type {string}
         */
        default_path: '../UserSavingDataFiles/',

        /**
         * @description It is used to define the default name of files to save the user data
         * @default Date in format YYYY-MM-DD
         * @type {string}
         */
        default_file_name: new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate(),

        /**
         * @description It is used to define if the user wants to change the file name
         * @default false
         * @type {boolean}
         */
        change_file_name: false,

        /**
         * @description It is used to define the user file name
         * @default ""
         * @type {string}
         */
        user_file_name: ""


    }
};

