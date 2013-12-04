module.exports = (function (port) {
  'use strict';

  var express = require('express');
  var http = require('http');

  var app = express();

  app.configure(function () {

    var env           = {};
    var services      = require('./lib/services')(env);
    var models        = require('./lib/models')(env, services);
    var controllers   = require('./lib/controllers')(env, models, services);
    var routes        = require('./lib/routes')(env, controllers);

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use('/', express.static(__dirname + '/public'));
    app.use(app.router);
    routes(app);
  });

  http.createServer(app).listen(port);
  console.log('server started on port: ' + port);

  return app;

})(process.env.PORT);
