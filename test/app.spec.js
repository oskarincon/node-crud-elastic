const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should;
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../api/index')

chai.use(chaiHttp);


/*
 #CRITERIA FOR TESTING: 
    #criteria for testing
    -Show all user and partial data 
        #success case:
            -should be type object as response
            -should be status 200
            -hould has from and size and success resposes
            -should hasn`t from and size and success respose
        #faild case:
            -when from field is alpha has faild
            -when size field is alpha has faild
*/
describe('Show all user and partial data ', function() {
    beforeEach(function() {});

    describe('Show all user and partial data ', function() {
        describe('success case GET method', function() {
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
            it('should be status 200', function(done) {
                chai.request(app)
                    .get('/api/v0/client/')
                    .query({
                        from: 0,
                        size: 1,
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal(200);
                        expect(res.body.results).to.have.own.property('value');
                        expect(res.body.results).to.have.own.property('relation');
                        expect(res.body.values[0]).to.have.own.property('id');
                        expect(res.body.values[0]).to.have.own.property('name');
                        expect(res.body.values[0]).to.have.own.property('gender');
                        expect(res.body.values[0]).to.have.own.property('account_number');
                        expect(res.body.values[0]).to.have.own.property('age');
                        expect(res.body.values[0]).to.have.own.property('balance');
                        expect(res.body.values[0]).to.have.own.property('address');
                        expect(res.body.values[0]).to.have.own.property('email');
                        expect(res.body.values[0]).to.have.own.property('city');
                        done();
                    });

            });
            it('should hasn`t from and size and success respose', function(done) {
                chai.request(app)
                    .get('/api/v0/client/')
                    .end(function(err, res) {
                        expect(res.status).to.equal(200);
                        done();
                    });

            });
            it('when from field is alpha has faild', function(done) {
                chai.request(app)
                    .get('/api/v0/client/')
                    .query({
                        from: 0,
                        size: 'dsdsds',
                    })
                    .end(function(err, res) {
                        expect(res.status).to.equal(500);
                        done();
                    });

            });
        });
    });
    describe('Show all save data ', function() {
        describe('success case POST  method', function() {
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
                        expect(res.status).to.equal(200);
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
            it('when the response is 500', function(done) {
                chai.request(app)
                    .post('/api/v0/client/')
                    .send({
                        id: '1004',
                        account_number: 1002,
                        balance: 9000,
                        firstname: 'oscar',
                        lastname: 'Duke',
                        age: true,
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

        });
    });
    describe('delete by id ', function() {
        describe('success case DELETE  method', function() {
            it('should created and response', function(done) {
                chai.request(app)
                    .del('/api/v0/client/' + '1004')
                    .end(function(err, res) {
                        expect(res.status).to.equal(200);
                        done();
                    });

            });
            it('should created and response', function(done) {
                chai.request(app)
                    .del('/api/v0/client/' + '1004')
                    .end(function(err, res) {
                        expect(res.status).to.equal(500);
                        done();
                    });

            });


        });
    });

    describe('get by balance ', function() {
        describe('success case DELETE  method', function() {
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
                        expect(res.status).to.equal(200);
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
                        expect(res.status).to.equal(200);
                        done();
                    });

            });


        });
    });



});