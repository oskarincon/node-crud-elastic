
let headersResponse = ((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "localhost:3000");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
  });

module.exports = {
    headersResponse
}