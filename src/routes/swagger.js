const express = require('express');
const routes = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const packageConfig = require('../../package.json');

routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ITIS-6177 Final Project',
            version: packageConfig.version,
        },
    },
    apis: ['./routes*.js'],
})));

module.exports = routes;
