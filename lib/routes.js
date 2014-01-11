module.exports = function (env, controllers) {
  return function (app) {
    app.get('/api/heartbeat', controllers.heartbeat.get);
    app.get('/api/runs',      controllers.runs.get);
  };
};
