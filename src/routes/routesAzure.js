const express = require('express');
const routes = express.Router();
const {body, query, validationResult} = require('express-validator');
const {Client} = require('node-rest-client');

const client = new Client();
const baseUrl = process.env.AZURE_LANGUAGE_URL;
const subscriptionKey = process.env.AZURE_LANGUAGE_SUBSCRIPTION_KEY;

if (baseUrl === null || typeof baseUrl === 'undefined' || baseUrl.length === 0) {
    throw new Error('Missing the baseUrl env variable');
}

if (subscriptionKey === null || typeof subscriptionKey === 'undefined' || subscriptionKey.length === 0) {
    throw new Error('Missing the subscriptionKey env variable');
}

const POST = (uri, data, callback) => {
    const args = {
        data: data,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
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
    body('text').isLength({min: 1}).withMessage('Text to analyze must be provided'),
    body('lang').optional({nullable: true}).isLength({min: 2, max: 7}).withMessage('Invalid language code given.').matches(/[a-z]{2}(-[A-Za-z]{2,4})?/).withMessage('Invalid language code given.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
 *     description: "Evaluate unstructured text, and return a list of the key phrases."
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
 *         description: "Returns a list of the key phrases for the given text."
 *       400:
 *         description: "An error describing any problems detected in the request."
 */
routes.post(
    '/phrases',
    body('text').isLength({min: 1}).withMessage('Text to analyze must be provided'),
    body('lang').optional({nullable: true}).isLength({min: 2, max: 7}).withMessage('Invalid language code given.').matches(/[a-z]{2}(-[A-Za-z]{2,4})?/).withMessage('Invalid language code given.'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        POST(process.env.AZURE_LANGUAGE_ENDPOINT_KEY_PHRASES, {
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
 * /sentiment:
 *   post:
 *     tags:
 *      - "Azure Cognitive Service for Language"
 *     description: "Provide sentiment labels (such as \"negative\", \"neutral\" and \"positive\") and confidence scores at the sentence and document-level."
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - name: opinions
 *        in: query
 *        description: "Provide more granular information about the opinions related to words (such as the attributes of products or services) in text."
 *        schema:
 *          type: boolean
 *          default: false
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
 *         description: "Return confidence scores between 0 and 1 for each document & sentences within it for positive, neutral and negative sentiment."
 *       400:
 *         description: "An error describing any problems detected in the request."
 */
routes.post(
    '/sentiment',
    query('opinions').optional().isBoolean().withMessage('Value must be either true or false').toBoolean(),
    body('text').isLength({min: 1}).withMessage('Text to analyze must be provided'),
    body('lang').optional({nullable: true}).isLength({min: 2, max: 7}).withMessage('Invalid language code given.').matches(/[a-z]{2}(-[A-Za-z]{2,4})?/).withMessage('Invalid language code given.'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        POST(process.env.AZURE_LANGUAGE_ENDPOINT_SENTIMENT + '?opinionMining=' + (req.query.opinions ? 'true' : 'false'), {
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
 * tags:
 *   - name: "Azure Cognitive Service for Language"
 *     description: "Understand conversations and unstructured text"
 */
module.exports = routes;
