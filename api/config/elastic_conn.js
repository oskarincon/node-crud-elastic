'use strict'
const es = require('elasticsearch');
require('dotenv').config();

const { logger } = require('../middleware/headersResponse');
const esClient = new es.Client({
    host: 'localhost:9200'
});
esClient.ping({
    requestTimeout: 30000
}, function(error) {
    logger.info("localhost:5601 - run db");
});

module.exports = esClient;