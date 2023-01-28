const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 

const secureRoute = require('./routes/routes');

const { httpLogStream } = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());
 
app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});
app.use('/api',secureRoute); 
 
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;