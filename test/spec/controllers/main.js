// 'use strict';

// describe('LocationFactory checks', function() {

//   var locationFactory;

//   beforeEach(angular.mock.module('angularTheftAppApp'));

//   beforeEach(inject(function(_locationFactory_){
//       locationFactory = _locationFactory_;
//   }));

//   it('should exist', function(){
//     expect(locationFactory).toBeDefined();
//   });
//   it('locCheck method exists', function() {
//     expect(locationFactory.locCheck).toBeDefined();
//   });
//   it('locCheck inside square', function() {
//     expect(locationFactory.locCheck(45.511900, -122.638973)).toEqual(true);
//   });
//   it('locCheck outside square', function() {
//     expect(locationFactory.locCheck(45.511900, -122.638973)).toEqual(true);
//   });


// });


  // beforeEach(inject(function($controller, $rootScope, baseURL){
  //   this.scope = $rootScope.$new();
  //   this.baseURL = baseURL;

  //   $controller('MapCtrl', { 
  //     $scope: this.scope,
  //   });
  // }));


  // describe('MapCtrl default values test', function(){
  //   it('sets map objects to default values', function() {
  //     //expect(this.scope.map).toEqual({ center: { latitude: 45.521570, longitude: -122.673371 }, zoom: 15 });
  //     expect(this.baseURL).toEqual('http://localhost:8000/api/v1/racks/');
  //   });

  // });