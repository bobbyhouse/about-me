var _   = require('underscore');
var url = require('url');


module.exports = function (env) {
  "use strict";

  var resource = {
    protocol: env.services.nike.protocol,
    hostname: env.services.nike.hostname,
    query:    env.services.nike.query
  };

  return {
    _request: require('request'),

    aggregate: function (cb) {
      var path = 'sport';
      var uri = url.format(_.extend({pathname: path}, resource));
      this._request.get(uri, cb);
    }
  };
};
