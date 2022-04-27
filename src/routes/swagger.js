const express = require('express');
const routes = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const packageConfig = require('../../package.json');

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'ITIS-6177 Final Project',
            version: packageConfig.version,
        },
    },
    // We prefix the route files to avoid parsing this file.
    apis: ['./src/routes/routes*.js'],
});
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "ITIS-6177 Final Project",
};

routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

module.exports = routes;
