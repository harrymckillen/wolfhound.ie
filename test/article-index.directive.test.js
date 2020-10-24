'use strict';

xdescribe('Article Index Directive', function() {

  var suite = null;

  var $compile,
      $rootScope,
      dataService,
      $cookies,
      $filter,
      $httpBackend,
      $location;

  beforeEach(module('wolfhound.app'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$location_, _dataService_, _$cookies_, _$filter_, ){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    dataService = _dataService_;
    $cookies = _$cookies_;
    $filter = _$filter_;
  }));

  it('should be defined', function() {


    var element = $compile('<div article-index></div>')($rootScope);
    $rootScope.$digest();
    expect(element).toBeDefined();
  });

});
