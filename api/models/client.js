const esclient = require('../config/elastic_conn');
const index = 'client';

let getMethod = async () => {
  const {hits} = await esclient.search({
    index
  })
  const results = hits.total;
  const values = hits.hits.map((hit) => {
    return {
      id: hit._id,
      name: hit._source.name,
      gender: hit._source.gender,
      isCovid: hit._source.isCovid
    }
  })
  return {
    results,
    values
  }
}

let postMethod = async (body) => {
  return await esclient.index({
    index,
    id: body.id,
    body:{
      name: body.name,
      gender: body.gender,
      isCovid: body.isCovid
    }
  })
}

let getMethodByOne = async (id) => {
  return await esclient.get({
    index,
    id: id
  })
}


let deleteMethod = async (id) => {
  return await esclient.get({
    index,
    id: id
  })
}


module.exports = {
  getMethod,
  postMethod,
  deleteMethod,
  getMethodByOne
}