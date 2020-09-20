const model = require("../models/client");
const { logger } = require('../middleware/headersResponse');


let getClients = async(req, res) => {
    try {
        let from = req.query.from;
        let size = req.query.size;
        const result = await model.getMethod(from, size);
        res.json(result);
    } catch (err) {
        logger.error(`error getClients ${err}`);
        console.log(err)
        res.status(500).json({ success: false, error: `error getClients ${err}` });
    }
}

let postClient = async(req, res) => {
    if (typeof req.body.id === 'undefined' || !req.body.id) {
        res.status(400).json({
            error: true,
            data: "Missing required id "
        });
        return;
    }
    let id = req.body.id;
    let body = req.body;
    delete body.id;
    if (!('balance' && 'firstname' && 'age' && 'balance' && 'gender' in body)) {
        res.status(400).json({
            error: true,
            data: "Missing required body "
        });
        return;
    }
    try {
        const result = await model.postMethod(id, body);
        res.status(200).json({ created: 'success' });
    } catch (err) {
        logger.error(`error postClient ${err}`);
        res.status(500).json({ success: false, error: `error postClients ${err}` });
    }
}

let deleteClient = async(req, res) => {

    let id = req.params.id;
    try {
        const result = await model.deleteMethod(id);
        res.status(200).json({ deleted: 'success' });
    } catch (err) {
        logger.error(`error deleteClient ${err}`);
        res.status(500).json({ success: false, error: `error getClients ${err}` });
    }
}

let getByAgeBalance = async(req, res) => {
    let range = req.body.range;
    let age = req.body.age;
    try {
        const result = await model.getMethodByAgeBalance(range, age);
        res.status(200).json({ sucess: result });
    } catch (err) {
        logger.error(`error getByAgeBalance ${err}`);
        res.status(500).json({ success: false, error: `error getClients ${err}` });
    }
}

module.exports = {
    getClients,
    postClient,
    deleteClient,
    getByAgeBalance
};