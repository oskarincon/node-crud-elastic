const express    = require("express");
const routes     = express.Router();
const controller = require('../controllers/clientController');



routes.get('/client', controller.getClients);
routes.post('/client', controller.postClient);
routes.get('/client/:id', controller.getClient);
routes.delete('/client/:id', controller.deleteClient);


module.exports = routes;
