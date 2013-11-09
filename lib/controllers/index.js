// Controllers
// ===========
//
// Controllers respond to "routing events." These routing events request that
// certain operations be performed on a resource. Typically, an operation will
// be in the form of an HTTP Verb (GET, PUT, POST, DELETE).
//
// Adding a new controller:
// ------------------------
//
// This code will ensure that this index stays up-to-date. If you want to
// add a new controller, all you have to do is add a file with a .js extension.

module.exports = (function (env, models, services) {
  "use strict";

  var _    = require('underscore');
  var fs   = require('fs');
  var path = require('path');

  var exports = {};

  var controllers = _.without(fs.readdirSync(__dirname), 'index.js');

  _.map(controllers, function (file) {
    var controller = path.basename(file, path.extname(file));
    exports[controller] = require('./' + controller)(env, models, services);
  });
  return exports;
});
