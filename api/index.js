const esClient = require('./config/elastic_conn');
const express = require('express');
const routes = require('./routes/routers');
const bodyParser = require('body-parser');
const {headersResponse} = require('./middleware/headersResponse');
const app = express();


app.use(bodyParser.json({ type: 'application/json' }))

app.use('/api/v0',headersResponse,routes);

  esClient.ping({
      requestTimeout: 30000
  }, function (error) {
      if (error) {
          console.trace('elasticsearch is down!');
      } else {
          console.log('well');
      }
  });
  

app.listen(3000)