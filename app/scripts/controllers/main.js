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

  }])

  ;

