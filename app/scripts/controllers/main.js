'use strict';

/**
 * @ngdoc function
 * @name angularTheftAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTheftAppApp
 */
angular.module('angularTheftAppApp')

  .controller('MapCtrl', function($scope, rackFinder) {

    $scope.map = { center: { latitude: 46, longitude: -123 }, zoom: 8 };

    $scope.markers = rackFinder.query();
    console.log($scope.markers);

  })
  ;

