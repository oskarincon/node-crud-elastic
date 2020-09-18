const express = require('express');
const routes = require('./routes/routers');
const bodyParser = require('body-parser');
const { headersResponse, logger } = require('./middleware/headersResponse');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }))

app.use('/api/v0', headersResponse, routes);


app.listen(3000, () => {
    logger.info("localhost:3000 - run app");
})

module.exports = app