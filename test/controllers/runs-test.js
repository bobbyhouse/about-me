var should = require('should');
var sinon  = require('sinon');

describe('Controllers.Runs', function() {

  var env           = require('../../config.json');
  var services      = require('../../lib/services')(env);
  var models        = require('../../lib/models')(env, services);
  var controllers   = require('../../lib/controllers')(env, models, services);

  it('should handle GETs', function() {
    controllers.runs.should.have.property('get')
  });

  describe('GETs', function() {
    var req, res;

    beforeEach(function() {
      services.nike.aggregate = sinon.spy();
      req = sinon.spy();
      res = {json: sinon.spy(), send: sinon.spy()};
      controllers.runs.get(req, res);
    });

    it('should use a service', function() {
      services.nike.aggregate.calledOnce.should.be.true;
    });

    describe('When service returns an a success', function() {
      var cb, body;

      beforeEach(function() {
        body = sinon.spy();
        cb = services.nike.aggregate.firstCall.args[0];
        cb(false, {statusCode: 200}, body);
      });

      it('should render json with body', function() {
        res.json.calledOnce.should.be.true;
        res.json.firstCall.args[0].should.equal(body);
      });
    });

    describe('When service returns an error', function() {
      var cb;

      beforeEach(function() {
        cb = services.nike.aggregate.firstCall.args[0];
        cb(true, null, null);
      });

      it('should render a 404', function() {
        res.send.calledOnce.should.be.true;
        res.send.firstCall.args[0].should.equal(404);
      });
    });
  });
})
