module.exports = Backbone.View.extend({

  template: require('../../templates/main.hbs'),

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
