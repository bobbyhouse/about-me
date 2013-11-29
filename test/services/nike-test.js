var should = require('should');
var sinon  = require('sinon');

var services = require('../../lib/services');


describe('When using the nike service', function() {

  var env           = require('../../config.json');
  var services      = require('../../lib/services')(env);
  var models        = require('../../lib/models')(env, services);
  var controllers   = require('../../lib/controllers')(env, models, services);

  it('should have an aggregate', function() {
    services.nike.should.have.property('aggregate');
  });

  describe('When getting aggregate data', function() {
    var cb;

    beforeEach(function() {
      cb = sinon.spy();
      services.nike._request.get = sinon.spy();
      services.nike.aggregate(cb);
    });

    it('should GET the aggregate data', function() {
      services.nike._request.get.calledOnce.should.be.true;
    });

    it('should make a request to the nike api', function() {
      var token = env.services.nike.query.token;
      var api = 'https://api.nike.com/me/sport?token=' + token;
      services.nike._request.get.firstCall.args[0].should.equal(api);
    });

    it('should pass callback through to request', function() {
      services.nike._request.get.firstCall.args[1].should.be.exactly(cb);
    });
  });
});
