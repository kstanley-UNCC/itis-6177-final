const express = require('express');
const routes = express.Router();

const baseUrl = process.env.AZURE_LANGUAGE_URL;

/**
 * @swagger
 * /entities:
 *   post:
 *     tags:
 *      - "Azure Cognitive Service for Language"
 *     description: "Identify different entities in text and categorize them into pre-defined types."
 *     responses:
 *       200:
 *         description: "Returns a list of entities categorized into pre-defined classes or types such as\\: person, location, event, product, and organization."
 *       400:
 *         description: "An error describing any problems detected in the request."
 */
routes.post('/entities', (req, res) => {});

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
