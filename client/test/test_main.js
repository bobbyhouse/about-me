var should = require('should');


describe('When using main', function() {

  it('should define main on window', function() {
    window.should.have.property('main');
  });
});
