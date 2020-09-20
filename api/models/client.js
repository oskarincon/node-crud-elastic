const esclient = require('../config/elastic_conn');
const index = 'bank';

let getMethod = async(from, size) => {
    const { hits } = await esclient.search({
        from,
        size,
        index
    })
    const results = hits.total;
    const values = hits.hits.map((hit) => {
        return {
            id: hit._id,
            name: `${hit._source.firstname} ${hit._source.lastname}`,
            gender: hit._source.gender,
            age: hit._source.age,
            account_number: hit._source.account_number,
            balance: hit._source.balance,
            address: hit._source.address,
            employer: hit._source.employer,
            email: hit._source.email,
            city: hit._source.city,
            state: hit._source.state,
        }
    })
    return {
        results,
        values
    }
}

let postMethod = async(id, body) => {
    return await esclient.index({
        index,
        id,
        body
    })
}

let deleteMethod = async(id) => {
    debugger;
    return await esclient.delete({
        index,
        id
    })
}

let getMethodByAgeBalance = async(range, age) => {
    const { aggregations } = await esclient.search({
        index,
        body: {
            query: {
                match_all: {}
            },
            aggs: {
                age_balance: {
                    range: {
                        field: 'balance',
                        ranges: range
                    },
                    aggs: {
                        age_range: {
                            terms: {
                                field: 'age',
                                size: age,
                                order: {
                                    _key: 'asc'
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    const results = aggregations.age_balance.buckets.map((hit) => {
        return {
            range: hit.key,
            age_range: hit.age_range.buckets

        }
    })
    return {
        results
    }
}

module.exports = {
    getMethod,
    postMethod,
    deleteMethod,
    getMethodByAgeBalance
}