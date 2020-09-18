const express = require("express");
const routes = express.Router();
const controller = require('../controllers/clientController');



routes.get('/client', controller.getClients);
routes.post('/client', controller.postClient);
routes.delete('/client/:id', controller.deleteClient);
routes.post('/client/age', controller.getByAgeBalance);

//routes.get('/client/:id(\d+)', controller.getClient);


module.exports = routes;