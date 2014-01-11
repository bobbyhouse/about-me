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
      services.nike._request = sinon.spy();
      services.nike.aggregate(cb);
    });

    it('should GET the aggregate data', function() {
      services.nike._request.calledOnce.should.be.true;
    });

    it('should request json data', function() {
      services.nike._request.firstCall.args[0].should.have.property('json');
      services.nike._request.firstCall.args[0].json.should.be.true;
    });

    it('should set the correct uri path', function() {
      var token = env.services.nike.query.access_token;
      var api = 'https://api.nike.com/me/sport?access_token=' + token;
      services.nike._request.firstCall.args[0].should.have.property('uri');
      services.nike._request.firstCall.args[0].uri.should.equal(api);
    });

    it('should pass callback through to request', function() {
      services.nike._request.firstCall.args[1].should.be.exactly(cb);
    });
  });
});
