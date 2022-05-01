const express = require('express');
const routes = express.Router();
const {Client} = require('node-rest-client');

const client = new Client();
const baseUrl = process.env.AZURE_LANGUAGE_URL;
const POST = (uri, data, callback) => {
    const args = {
        data: data,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.AZURE_LANGUAGE_SUBSCRIPTION_KEY,
            'Content-Type': 'application/json',
        },
    };

    client.post(`${baseUrl}${uri}`, args, callback);
};

/**
 * @swagger
 * /entities:
 *   post:
 *     tags:
 *      - "Azure Cognitive Service for Language"
 *     description: "Identify different entities in text and categorize them into pre-defined types."
 *     produces:
 *      - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                language:
 *                  type: string
 *            examples:
 *               "application/json":
 *                   summary: "Example to Analyze"
 *                   value:
 *                       text: "Thor's retirement is interrupted by a galactic killer known as Gorr the God Butcher, who seeks the extinction of the gods. To combat the threat, Thor enlists the help of King Valkyrie, Korg and ex-girlfriend Jane Foster, who - to Thor's surprise - inexplicably wields his magical hammer, Mjolnir, as the Mighty Thor. Together, they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher's vengeance and stop him before it's too late."
 *                       lang: "en"
 *     responses:
 *       200:
 *         description: "Returns a list of entities categorized into pre-defined classes or types such as\\: person, location, event, product, and organization."
 *       400:
 *         description: "An error describing any problems detected in the request."
 */
routes.post(
    '/entities',
    (req, res, next) => {
        POST(process.env.AZURE_LANGUAGE_ENDPOINT_NAMED_ENTITIES, {
            documents: [{
                id: new Date().getTime(),
                text: req.body.text,
                language: req.body.lang || null,
            }],
        }, data => {
            if (typeof data.error !== 'undefined' && typeof data.error.innererror !== 'undefined') {
                next({
                    statusCode: 400,
                    error: data.error.innererror.message,
                });

                return;
            }

            res.send(data);
        });
    }
);

/**
 * @swagger
 * /phrases:
 *   post:
 *     tags:
 *      - "Azure Cognitive Service for Language"
 *     description: "Identify the most important points in a piece of text."
 *     responses:
 *       200:
 *         description: "Returns a list of key phrases for the given document."
 *       400:
 *         description: "An error describing any problems detected in the request."
 */
routes.post('/phrases', (req, res) => {});

/**
 * @swagger
 * /sentiment:
 *   post:
 *     tags:
 *      - "Azure Cognitive Service for Language"
 *     description: "Detect positive, negative and neutral sentiment in text. Get more insights by mining opinions."
 *     responses:
 *       200:
 *         description: "Returns structures describing the sentiment labels (positive, neutral, and negative) and confidence scores for the given document."
 *       400:
 *         description: "An error describing any problems detected in the request."
 */
routes.post('/sentiment', (req, res) => {});

/**
 * @swagger
 * tags:
 *   - name: "Azure Cognitive Service for Language"
 *     description: "Understand conversations and unstructured text"
 */
module.exports = routes;
