'use strict';

describe('Unit testing Active Menu Link Directive', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('wolfhound.app'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Test if Link is Active', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<a href="/" active-menu-link>Home</a>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    // expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });
});
