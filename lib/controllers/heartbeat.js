module.exports = function (env, models) {
  return {
    get: function (req, res) {
      res.json({'status': 'ok'}, 200);
    }
  };
};
