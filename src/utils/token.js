const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generate = (data) => jwt.sign({ data }, JWT_SECRET_KEY, { expiresIn: '1d'});

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}