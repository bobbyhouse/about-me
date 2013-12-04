var Main = require('./views/main');

var App = Backbone.Router.extend({

  initialize: function() {
    var main = new Main();
    $('#main').html(main.render().el);
  },

  routes: {
    "*actions": "defaultRoute"
  },

  defaultRoute: function() {
  }
});

app = new App();
Backbone.history.start();
