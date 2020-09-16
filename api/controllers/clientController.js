const model = require("../models/client");


let getClients = async(req, res) => {
    try {
      const result =  await model.getMethod();
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: `error getClients ${err}` });
    }
  }

  let postClient = async(req, res) => {
    let body = req.body;
    if (!body.name || !body.isCovid || !body.id || !body.gender) {
        res.status(400).json({
        error: true,
        data: "Missing required parameter(s): 'name' or 'isCovid' or 'id'! or 'gender' "
      });
      return;
    }
    try {
      const result =  await model.postMethod(body);
      res.status(200).json({ created: 'success' });
    } catch (err) {
      res.status(500).json({ success: false, error: `error postClients ${err}` });
    }
  }

  let getClient = async(req, res) => {
    let id = req.param.id;
    try {
      const result =  await model.getMethodByOne(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: `error getClients ${err}` });
    }
  }

  let deleteClient = async(req, res) => {
    let id = req.param.id;
    try {
      const result =  await model.deleteMethod(id);
      res.status(200).json({ deleted: 'success' });
    } catch (err) {
      res.status(500).json({ success: false, error: `error getClients ${err}` });
    }
  }

module.exports = {
  getClients,
  postClient,
  getClient,
  deleteClient
};