var should = require('should');


describe('When using app', function() {

  it('should define app on window', function() {
    window.should.have.property('app');
  });

  it('should be a Backbone router', function() {
    window.app.should.be.an.instanceOf(Backbone.Router);
  });
});
