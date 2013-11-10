var should = require('should');
var sinon  = require('sinon');

describe('Controllers.Heartbeat', function() {

  var env           = {};
  var services      = require('../../lib/services')(env);
  var models        = require('../../lib/models')(env, services);
  var controllers   = require('../../lib/controllers')(env, models, services);

  console.log(__dirname)


  it('should handle GETs', function() {
    controllers.heartbeat.should.have.property('get')
  });

  describe('GETs', function() {
    var req = sinon.spy();
    var res = {json: sinon.spy()};

    controllers.heartbeat.get(req, res);

    it('should render json data with success', function() {
      res.json.calledWith({'status': 'ok'}, 200).should.be.true
    });
  });

})
