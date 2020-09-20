const expect = require('chai').expect;
let sinon = require("sinon");
let proxyquire = require('proxyquire');
let controller = require('../api/controllers/clientController');
const queryGet = require('../test/mocks/response.search.json');
const queryPost = require('../test/mocks/response.post.json');
const queryDelete = require('../test/mocks/response.delete.json');
const queryAgs = require('../test/mocks/response.postAggs.json');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../api/index')
chai.use(chaiHttp);
let stubElastic;
let FakeClient;

const body = {
    id: "1004",
    account_number: 1002,
    balance: 9000,
    firstname: "oscar",
    lastname: "Duke",
    age: true,
    gender: "M",
    address: "880 Holmes Lane",
    employer: "Pyrami",
    email: "amberduke@pyrami.com",
    city: "Brogan",
    state: ""
}

describe('testing models', function() {
    describe('testing search 1', function() {
        beforeEach(function() {
            FakeClient = sinon.stub();
            FakeClient.prototype.search = sinon.stub().returns(queryGet);
            let fakeClient = new FakeClient();
            stubElastic = proxyquire('../api/models/client', {
                '../config/elastic_conn': { search: fakeClient.search }
            });
        });
        afterEach(() => {
            sinon.restore()
        });
        describe('example', function() {
            const expectatyQuery = {
                results: { value: 1007, relation: 'eq' },
                values: [{
                    id: '1',
                    name: 'Amber Duke',
                    gender: 'M',
                    age: 32,
                    account_number: 1,
                    balance: 39225,
                    address: '880 Holmes Lane',
                    employer: 'Pyrami',
                    email: 'amberduke@pyrami.com',
                    city: 'Brogan',
                    state: 'IL'
                }]
            }
            it('when is called with search has sucess respo', async function() {
                let actual = await stubElastic.getMethod(1, 2);
                expect(expectatyQuery).to.deep.equal(actual)
            });
            it('should has all properties', async function() {
                let actual = await stubElastic.getMethod(1, 2);
                expect(expectatyQuery).to.have.all.keys(actual)
            });
        });
    });

    describe('testing post', function() {
        beforeEach(function() {
            FakeClient = sinon.stub();
            FakeClient.prototype.index = sinon.stub().returns(queryPost);
            let fakeClient = new FakeClient();
            stubElastic = proxyquire('../api/models/client', {
                '../config/elastic_conn': { index: fakeClient.index }
            });
        });
        afterEach(() => {
            sinon.restore()
        });
        describe('example', function() {
            const expectatyQuery = {}
            it('when is called with post has sucess respo', async function() {
                let actual = await stubElastic.postMethod(body.id, body);
                expect(expectatyQuery).to.deep.equal(actual)
            });

            it('when ----', async function() {
                let bodyTest = {
                    id: "1004",
                    account_number: 1002,
                    balance: 9000,
                    firstname: "oscar",
                    lastname: "Duke",
                    age: true,
                    gender: "M",
                    address: "880 Holmes Lane",
                    employer: "Pyrami",
                    email: "amberduke@pyrami.com",
                    city: "Brogan",
                    state: ""
                }
                stubElastic.postMethod(body.id, body);
                expect(FakeClient.calledOnce).to.be.true
                expect(FakeClient.calledWith(bodyTest.id, sinon.match(bodyTest))).to.be.false
            });

        });
    });
    describe('testing deleted', function() {
        beforeEach(function() {
            FakeClient = sinon.stub();
            FakeClient.prototype.delete = sinon.stub().returns(queryDelete);
            let fakeClient = new FakeClient();
            stubElastic = proxyquire('../api/models/client', {
                '../config/elastic_conn': { delete: fakeClient.delete }
            });
        });
        afterEach(() => {
            sinon.restore()
        });
        describe('example', function() {
            const expectatyQuery = {}
            it('when is called with delete has sucess respo', async function() {
                let actual = await stubElastic.deleteMethod(body.id);
                expect(expectatyQuery).to.deep.equal(await stubElastic.deleteMethod(body.id))
            });

        });
    });
    describe('testing post aggs', function() {
        beforeEach(function() {
            FakeClient = sinon.stub();
            FakeClient.prototype.search = sinon.stub().returns(queryAgs);
            let fakeClient = new FakeClient();
            stubElastic = proxyquire('../api/models/client', {
                '../config/elastic_conn': { search: fakeClient.search }
            });
        });
        afterEach(() => {
            sinon.restore()
        });
        describe('example', function() {
            let expectatyQuery = {
                results: [{
                    range: "0.0-4000.0",
                    age_range: [{
                        key: 20,
                        doc_count: 6
                    }]
                }]
            }
            it('when is called with delete has sucess respo', async function() {
                let actual = await stubElastic.getMethodByAgeBalance(1, 5);
                debugger;
                expect(expectatyQuery).to.deep.equal(actual)
            });

        });
    });
    describe('testing post aggs', function() {
        describe('example', function() {
            it('should be type object as response', function(done) {
                chai.request(app)
                    .get('/api/v0/client/')
                    .query({
                        from: 0,
                        size: 1,
                    })
                    .end(function(err, res) {
                        expect(typeof res).to.equal('object');
                        done();
                    });

            });
            it('should created and response 200', function(done) {
                chai.request(app)
                    .post('/api/v0/client/')
                    .send({
                        id: '1004',
                        account_number: 1002,
                        balance: 9000,
                        firstname: 'oscar',
                        lastname: 'Duke',
                        age: 28,
                        gender: 'M',
                        address: '880 Holmes Lane',
                        employer: 'Pyrami',
                        email: 'amberduke@pyrami.com',
                        city: 'Brogan',
                        state: 'IL'
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal(500);
                        done();
                    });

            });
            it('should created and response', function(done) {
                chai.request(app)
                    .del('/api/v0/client/' + '1004')
                    .end(function(err, res) {
                        expect(res.status).to.equal('object');
                        done();
                    });

            });
            it('should created and response', function(done) {
                chai.request(app)
                    .del('/api/v0/client/' + '1004')
                    .end(function(err, res) {
                        expect(res.status).to.equal('object');
                        done();
                    });

            });
            it('should created and response', function(done) {
                chai.request(app)
                    .post('/api/v0/client/age')
                    .send({
                        range: [{
                                from: 0,
                                to: 4000
                            },
                            {
                                from: 8000,
                                to: 12000
                            }
                        ],
                        age: 28
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal('object');
                        done();
                    });

            });
            it('should created and faild response ', function(done) {
                chai.request(app)
                    .post('/api/v0/client/age')
                    .send({
                        range: [{
                                from: 0,
                                to: true
                            },
                            {
                                from: 8000,
                                to: 12000
                            }
                        ],
                        age: 28
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal(500);
                        done();
                    });

            });
            it('when in the request body it hasn` body ', function(done) {
                chai.request(app)
                    .post('/api/v0/client/')
                    .send({
                        id: '1004',
                        account_number: 1002,
                        balance: 9000,
                        firstname: 'oscar',
                        lastname: 'Duke',
                        age: 28,
                        address: '880 Holmes Lane',
                        employer: 'Pyrami',
                        email: 'amberduke@pyrami.com',
                        city: 'Brogan',
                        state: 'IL'
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });

            });
            it('when in the request body it hasn`t id ', function(done) {
                chai.request(app)
                    .post('/api/v0/client/')
                    .send({
                        account_number: 1002,
                        balance: 9000,
                        firstname: 'oscar',
                        lastname: 'Duke',
                        age: 28,
                        gender: 'M',
                        address: '880 Holmes Lane',
                        employer: 'Pyrami',
                        email: 'amberduke@pyrami.com',
                        city: 'Brogan',
                        state: 'IL'
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal(400);
                        done();
                    });

            });


        });
    });
});