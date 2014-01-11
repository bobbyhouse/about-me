var should = require('should');


describe('Views.Main', function() {

  it('should exists', function() {
    should.exist(require('../../src/views/main'));
  });
});

describe('Rendering', function() {

  var view = new (require('../../src/views/main'))();
  var returned = view.render();

  it('should render template', function() {
    view.$('p').should.have.length(1);
  });
});
