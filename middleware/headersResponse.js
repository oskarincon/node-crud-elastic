const winston = require('winston');


let headersResponse = ((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ 'timestamp': true, level: 'error' }),
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ 'timestamp': true, filename: 'info.log', level: 'info' })
    ],
});

module.exports = {
    headersResponse,
    logger
}