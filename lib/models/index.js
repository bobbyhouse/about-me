// Models
// ======
//
// Models represent the object interface to the part of the application that
// is persisted onto disk.
//
// Adding a new model:
// -------------------
//
// This code will ensure that this index stays up-to-date. If you want to
// add a new model, all you have to do is add a file with a .js extension.

module.exports = (function (env, service) {
  "use strict";

  var _    = require('underscore');
  var fs   = require('fs');
  var path = require('path');

  var exports = {};

  var models = _.without(fs.readdirSync(__dirname), 'index.js');

  _.map(models, function (file) {
    var model = path.basename(file, path.extname(file));
    exports[model] = require('./' + model)(env, service);
  });
  return exports;
});
