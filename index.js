require('dotenv').config();

const express = require('express');
const HTTP_PORT = process.env.HTTP_PORT;

const app = express();

// A little added security measure.
app.disable('x-powered-by');

// Treat everything like JSON
app.use(express.json());

// Initialize our main routes
app.use('/', require('./src/routes/routesAzure'));
app.use('/docs', require('./src/routes/swagger'));

// Redirect get requests to / to the documentation
app.get('/', (req, res) => res.redirect('/docs'));

// Catch-all for any non-configured endpoint to be a 404 error.
app.use('*', (req, res, next) => {
    res.status(404).json({error: 'Endpoint not found'});
    next();
});

// Catch-all for unhandled errors.
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({error: err});
});

// Run the server and listen on our configured port.
app.listen(HTTP_PORT, () => console.log(`Server is running on port ${HTTP_PORT}`));
