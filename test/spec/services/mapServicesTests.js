'use strict';

describe('mapServices tests', function() {
  var mapServices;

  beforeEach(angular.mock.module('angularTheftAppApp'));

  beforeEach(inject(function(_mapServices_) {
    mapServices = _mapServices_;
  }));

  it('should exist', function() {
    expect(mapServices).toBeDefined();
  });

  it('getMapOptions method defined', function() {
    expect(mapServices.getMapOptions).toBeDefined();
    expect(mapServices.getMapOptions().mapOptions).toBeDefined();
  });

  it('locationCheck method defined', function() {
    expect(mapServices.locationCheck).toBeDefined();
    expect(mapServices.locationCheck).toBeDefined();
  });

  it('locationCheck menthod works correctly', function() {
    expect(mapServices.locationCheck(45.511900, -122.638973)).toEqual(true);
    expect(mapServices.locationCheck(45.649831, -123.059892)).toEqual(false);
    expect(mapServices.locationCheck(123.059892, -45.649831)).toEqual(false);
    expect(mapServices.locationCheck(-45.649831, 122.45689)).toEqual(false);
  });

  // ******************* need to figure out how to mock window/map object in test ******************* //
  it('getCurrentLoc method defined', function() {
    expect(mapServices.getCurrentLoc).toBeDefined();
  });
  it('getMapDist method defined', function() {
    expect(mapServices.getMapDist).toBeDefined();
  });
  // -------------------------------------------------------------------------------------------------

});
