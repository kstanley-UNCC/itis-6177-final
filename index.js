require('dotenv').config();

const express = require('express');
const swaggerRoutes = require('./src/routes/swagger');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT;

app.use('/docs', swaggerRoutes);
app.listen(HTTP_PORT, () => console.log(`Server is running on port ${HTTP_PORT}`));
