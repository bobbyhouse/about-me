var should = require('should');

describe('Routes', function() {

  var app = require('express')();

  var env           = require('../config.json');
  var services      = require('../lib/services')(env);
  var models        = require('../lib/models')(env, services);
  var controllers   = require('../lib/controllers')(env, models, services);
  var routes        = require('../lib/routes')(env, controllers);

  routes(app)

  it('adds one GET', function() {
    app.routes.get.should.have.length(1);
  });

  it('adds GET for heartbeat', function() {

    var heartbeat = {
      path: '/api/heartbeat',
      method: 'get',
      callbacks: [controllers.heartbeat.get],
      keys: [],
      regexp: /^\/api\/heartbeat\/?$/i
    };
    app.routes.get.should.includeEql(heartbeat);
  });

  it('does not add PATCHs', function() {
    app.routes.should.not.have.property('patch');
  });

  it('does not add POSTs', function() {
    app.routes.should.not.have.property('post');
  });

  it('does not add PUTs', function() {
    app.routes.should.not.have.property('put');
  });

  it('does not add TRACEs', function() {
    app.routes.should.not.have.property('trace');
  });
});
