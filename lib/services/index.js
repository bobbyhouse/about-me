// Services
// ========
//
// Services exports common interfaces to various services that may be needed
// throughout our application. This could include an instance of a Mongo
// cluster, an external API, or a RabbitMQ connection.
//
// Adding a new service:
// ---------------------
//
// This code will ensure that this index stays up-to-date. If you want to
// add a new service, all you have to do is add a file with a .js extension.

module.exports = (function (env) {
  "use strict";

  var _    = require('underscore');
  var fs   = require('fs');
  var path = require('path');

  var exports = {};

  var services = _.without(fs.readdirSync(__dirname), 'index.js');

  _.map(services, function (file) {
    var service = path.basename(file, path.extname(file));
    exports[service] = require('./' + service)(env);
  });
  return exports;
});
