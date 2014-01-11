module.exports = function (env, models, services) {
  "use strict";

  return {
    get: function (req, res) {
      services.nike.aggregate(function(err, response, body) {
        if(!err && response.statusCode >= 200 && response.statusCode < 300) {
          res.json(body);
        } else {
          res.send(404);
        }
      });
    }
  };
};
