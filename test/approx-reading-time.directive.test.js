'use strict';

describe('Approx Reading Time Directive', function() {
  var $compile,
      $rootScope;

  beforeEach(module('wolfhound.app'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should be defined', function() {
    var document = {};
    // var document.body.innerHTML = '<p>There should </p>';

    var element = $compile('<span approx-reading-time></span>')($rootScope);
    $rootScope.$digest();
    expect(element).toBeDefined();

  });

});

