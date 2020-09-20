const es = require('elasticsearch');
const { logger } = require('../middleware/headersResponse');
require('dotenv').config();
// connection base
let esClient = new es.Client({
    host: 'localhost:9200'
});

if (process.env.NODE_ENV !== 'test') {
    esClient.ping({
        requestTimeout: 30000
    }, function(error) {
        logger.info("localhost:5601 - run db");
    });
}


module.exports = esClient;