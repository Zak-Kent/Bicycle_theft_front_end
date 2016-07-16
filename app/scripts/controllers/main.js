'use strict';

/**
 * @ngdoc function
 * @name angularTheftAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTheftAppApp
 */
angular.module('angularTheftAppApp')

  .controller('MapCtrl', ['$scope', function($scope) {

    $scope.map = { center: { latitude: 46, longitude: -123 }, zoom: 8 };

    $scope.markersList = [
      {latitude: 46, longitude: -123.3, id: '1'},
      {latitude: 46, longitude: -123.5 , id: '2'},
      {latitude: 46, longitude: -123.7, id: '3'}
    ];


  }])

  ;

