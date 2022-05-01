require('dotenv').config();
const express = require('express');
const HTTP_PORT = process.env.HTTP_PORT;

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use('/', require('./src/routes/routesAzure'));
app.get('/', (req, res) => res.redirect('/docs'));
app.use('/docs', require('./src/routes/swagger'));

app.listen(HTTP_PORT, () => console.log(`Server is running on port ${HTTP_PORT}`));
