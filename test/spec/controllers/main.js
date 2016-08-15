'use strict';

describe('controller: MapCtrl', function() {
  beforeEach(module('angularTheftAppApp'));

  beforeEach(inject(function($controller, $rootScope, baseURL){
    this.scope = $rootScope.$new();
    this.baseURL = baseURL;

    $controller('MapCtrl', { 
      $scope: this.scope,
    });
  }));

  describe('MapCtrl default values test', function(){
    it('sets map objects to default values', function() {
      expect(this.scope.map).toEqual({ center: { latitude: 45.521570, longitude: -122.673371 }, zoom: 10 });
      expect(this.baseURL).toEqual('http://localhost:8000/api/v1/racks/');
    });

  });
});


