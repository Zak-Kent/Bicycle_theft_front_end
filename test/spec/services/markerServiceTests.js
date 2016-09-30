'use strict';

describe('markerFactory checks', function() {

  var markerFactory;

  beforeEach(angular.mock.module('angularTheftAppApp'));

  beforeEach(inject(function(_markerFactory_){
      markerFactory = _markerFactory_;
  }));

  it('should exist', function(){
    expect(markerFactory).toBeDefined();
  });
  it('markerFactory creates object', function(){
    expect(markerFactory.createMarker(45, 50, function(){})).toBeDefined();
  });
    it('markerFactory object has correct properties', function(){
    var marker = markerFactory.createMarker(45, 50, function(){});
    expect(marker.coords.latitude).toEqual(45);
    expect(marker.coords.longitude).toEqual(50);
  });
});