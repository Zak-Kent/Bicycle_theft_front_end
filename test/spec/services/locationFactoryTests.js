'use strict';

describe('LocationFactory checks', function() {

  var locationFactory;

  beforeEach(angular.mock.module('angularTheftAppApp'));

  beforeEach(inject(function(_locationFactory_){
      locationFactory = _locationFactory_;
  }));

  it('should exist', function(){
    expect(locationFactory).toBeDefined();
  });
  it('locCheck method exists', function() {
    expect(locationFactory.locCheck).toBeDefined();
  });
  it('locCheck inside square', function() {
    expect(locationFactory.locCheck(45.511900, -122.638973)).toEqual(true);
  });
  it('locCheck outside square', function() {
    expect(locationFactory.locCheck(45.649831, -123.059892)).toEqual(false);
  });
});