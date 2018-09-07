'use strict';

describe('Active Menu Link Directive', function() {
  var $compile,
      $rootScope,
      $location;

  beforeEach(module('wolfhound.app'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$location_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $location = _$location_;
  }));

  it('should be defined', function() {

    $location.path('/');

    var element = $compile('<a href="/" active-menu-link>Home</a>')($rootScope);
    $rootScope.$digest();
    expect(element).toBeDefined();
  });

  it('should have active class set if path matches about page', function() {

    $location.path('/about.html');

    var element = $compile('<a href="/about.html" active-menu-link>About</a>')($rootScope);
    $rootScope.$digest();
    expect(element.attr('class')).toBe('active');
  });

  it('should not set active class', function() {

    $location.path('/work.html');

    var element = $compile('<a href="/contact.html" active-menu-link>Contact</a>')($rootScope);
    $rootScope.$digest();
    expect(element.attr('class')).not.toBe('active');
  });

});
