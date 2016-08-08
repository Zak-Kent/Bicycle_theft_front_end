'use strict';

/**
 * @ngdoc function
 * @name angularTheftAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTheftAppApp
 */

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! issues below !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
// still have issue with pagination and returning more than 25 rack per get request 
// need to make option of placing marker 
// create button to redo search with new marker location 

angular.module('angularTheftAppApp')
    .constant('baseURL','http://localhost:8000/api/v1/racks/')
    .controller('MapCtrl', ['$scope', '$http', 'baseURL', function($scope, $http, baseURL) {

        $scope.map = { center: { latitude: 46, longitude: -123 }, zoom: 8 };

        // work on moving url call to a factory service 
        // $scope.markers = rackFinder;
// ----------------------------------------------------------------------------------------------
        $scope.marker = {
          id: 0,
          coords: {
            latitude: 45.521570,
            longitude: -122.673371
          },
          options: { draggable: true },
          events: {
            dragend: function (marker) {
              console.log('marker dragend');
              var lat = marker.getPosition().lat();
              var lon = marker.getPosition().lng();
              console.log(lat);
              console.log(lon);

              $scope.marker.options = {
                draggable: true,
                labelContent: 'lat: ' + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                labelAnchor: '100 0',
                labelClass: 'marker-labels'
              };
            }
          }
        };


// ----------------------------------------------------------------------------------------------
        $scope.markerBreakdown = [];

        $http.get(baseURL+'?dist=100&point=-122.678713,45.514798')
        .then(function(response) {
            $scope.markers = response.data.results; 
            // break up json object to format gmap can use with markers 
            for (var i = 0; i < $scope.markers.length; i++) { 
                var obj = {id: $scope.markers[i].id, 
                        longitude: $scope.markers[i].geom.coordinates[0],
                        latitude: $scope.markers[i].geom.coordinates[1]};

                $scope.markerBreakdown.push(obj);
            }
        });


    }]);

