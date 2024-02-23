# MetricInsights Frontend

[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This is the Frontend for MetricInsights. 
It is a express application that serves the frontend for the MetricInsights application.

This application is used to display the data from the backend and to configure the data to display.

You can find the backend of the application [here](https://github.com/JamesWebb17/MetricInsight_BackEnd)

This project is made by : [Faucher Simon](https://www.linkedin.com/in/Faucher-Simon/)

Version : 1.0

## Summary

- [MetricInsights Frontend](#metricinsights-frontend)
- [Summary](#summary)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Dependencies](#dependencies)
  - [Set up your environment](#Set-up-your-environment)
  - [Running the project](#running-the-project)
- [Organization](#organization)
  - [Directory structure](#directory-structure)
  - [Files](#files)
- [Docker](#docker)
  - [Build the image](#build-the-image)
  - [Run the container](#run-the-container)
  - [Stop the container](#stop-the-container)
  - [Remove the container](#remove-the-container)
  - [Remove the image](#remove-the-image)
- [Documentation](#documentation)
  - [JSDoc](#jsdoc)
  - [API](#api)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Installation

### Prerequisites

To install the project, you need to have Node.js installed on your computer.

### Dependencies

This is the list of the dependencies used in the project:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [JSDoc](https://jsdoc.app/)
- [NPM](https://www.npmjs.com/)
- [WS](https://www.npmjs.com/package/ws)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)
- [EJS](https://www.npmjs.com/package/ejs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [morgan](https://www.npmjs.com/package/morgan)
- [http-errors](https://www.npmjs.com/package/http-errors)
- [express](https://www.npmjs.com/package/express)
- [docdash](https://www.npmjs.com/package/docdash)
- [debug](https://www.npmjs.com/package/debug)
- [cors](https://www.npmjs.com/package/cors)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

Version of the dependencies are specified in the [package.json](package.json) file.

To install the dependencies, you need to run the following command in the [root](./) directory of the project:

```bash 
npm install
```

### Set up your environment

To set the project, you need to change the [.env](./bin/.env) file in the [bin](./bin) directory of the project.

The .env file should look like this:

```env
## Server
FRONTEND_PORT=
FRONTEND_IP=

## Backend
BACKEND_PORT=
BACKEND_IP=
```

You have to write the IP and the port of the backend and the frontend in the [.env](./bin/.env) file.

Per default, the backend is running on the port 3001 and the frontend on the port 3000,
and those IP are set to localhost or it's automaticaly set to the IP of the computer (only on linux)

This is an example of the [.env](./bin/.env) file:

```env
## Server
FRONTEND_PORT=3000
FRONTEND_IP=10.10.10.10

## Backend
BACKEND_PORT=3001
BACKEND_IP=10.10.10.11
```
### Running the project

To run the project, you need to run the following command in the [bin](./bin) directory of the project:

```bash
npm start
```

You should see the following message in the console:

```
Server is running at [Your IP]:[Your Port]
webapp:server Listening on port [Your Port] +0ms
```

## Organization

### Directory structure

This is the directory structure of the project:

```
.
├── bin
│   ├── .env
│   ├── config.js
│   └── www
├── public
│   └── Documentation
│   │   ├── Frontend
│   │   └── Backend
│   ├── images
│   ├── javascripts
│   ├── stylesheets
│   └── views
├── routes
│   ├── api
│   │   └── configuration.js
│   ├── configuration.js
│   ├── documentation.js
│   ├── help.js
│   ├── login.js
│   ├── mainPage.js
│   ├── MetricInsights.js
│   └── users.js
├── UserConfigurationFiles
│   ├── MetricInsightDefaultConfiguration.json
│   ├── MetricInsightDisplaytConfiguration.json
│   ├── MetricInsightMonitoringConfiguration.json
│   └── MetricInsighSavingConfiguration.json
├── UserSavingFiles
├── views
│   ├── configuration.ejs
│   ├── contact.html
│   ├── documentation.html
│   ├── error.ejs
│   ├── help.html
│   ├── login.html
│   ├── mainPage.html
│   └── MetricInsights.html
├── .dockerignore
├── .gitignore
├── app.js
├── Dockerfile
├── jsdoc.json
├── package.json
├── package-lock.json
└── README.md
```

### Files

This is the list of the files in the project:

- [bin](./bin) : This directory contains the .env file and the www file that is the entry point of the application.
- [public](./public) : This directory contains all the public files of the application. It contains the images, the stylesheets, the javascripts and the views.
- [routes](./routes) : This directory contains all the routes of the application. It contains the api directory that contains the configuration.js file, the configuration.js file, the documentation.js file, the help.js file, the login.js file, the mainPage.js file, the MetricInsights.js file and the users.js file.
- [UserConfigurationFiles](./UserConfigurationFiles) : This directory contains all the configuration files of the application.
- [UserSavingFiles](./UserSavingFiles) : This directory contains the data saved by the user.
- [views](./views) : This directory contains all the views of the application.
- [.dockerignore](./.dockerignore) : This file is used to ignore files when building the docker image.
- [.gitignore](./.gitignore) : This file is used to ignore files when pushing to git.
- [app.js](./app.js) : This file is the entry point of the application.
- [Dockerfile](./Dockerfile) : This file is used to build the docker image.
- [jsdoc.json](./jsdoc.json) : This file is used to configure the jsdoc.
- [package.json](./package.json) : This file contains the list of the dependencies, the entry point of the application and the scripts of the application.
- [package-lock.json](./package-lock.json) : This file contains the list of the dependencies with the version of the dependencies.
- [README.md](./README.md) : This file contains the documentation of the application.

## Docker

### Build the image

To build the image, you need to run the following command in the [root](./) directory of the project:

```bash
docker build -t metricinsights-frontend .
```

### Run the container

To run the container, you need to run the following command in the [root](./) directory of the project:

```bash
docker run -p 3000:3000 -d metricinsights-frontend
```

### Stop the container

To stop the container, you need to run the following command in the [root](./) directory of the project:

```bash
docker stop [container_id]
```

### Remove the container

To remove the container, you need to run the following command in the [root](./) directory of the project:

```bash
docker rm [container_id]
```

### Remove the image

To remove the image, you need to run the following command in the [root](./) directory of the project:

```bash
docker rmi metricinsights-frontend
```

## Documentation

### JSDoc

To generate the JSDoc, you need to run the following command in the [root](./) directory of the project:

```bash
npm run doc
```

The documentation will be generated in the [public/Documentation/Frontend](./public/Documentation/Frontend) directory of the project.

### API

The API documentation is available in the [public/Documentation/Backend](./public/Documentation/Backend) directory of the project.

## License

This project is licensed under the CC License - see the [LICENSE](LICENSE) file for details.

## Contact

- Email : simon.faucher@etudiant.univ-rennes1.fr

## Acknowledgements


Thank to [Robin Gerzaguet](https://perso.univ-rennes1.fr/robin.gerzaguet/) whose enlightened advice helped me
to guide me through this project. Her expertise was a beacon throughout the process.

Thank to [Paul Bazerque](https://fr.linkedin.com/in/paul-bazerque) for its commitment to the project, as well as
his help with technical and directional choices.

Finally, I would also like to thank [Matthieu Gautier](https://people.irisa.fr/Matthieu.Gautier/), [Alice Chillet](https://www.linkedin.com/in/alice-chillet/) and [Emma Bothereau](https://www.linkedin.com/in/emma-bothereau/) for their contributions to this project.