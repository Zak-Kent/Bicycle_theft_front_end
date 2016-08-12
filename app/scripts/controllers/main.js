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

// need to make option of placing marker - have a dragable starting marker now 
// need to make marker start at use location 

// create button to redo search with new marker location - have button  

// add logic to respond with message saying no racks found within range

// have map return first 10 racs in above case with map fit to marker and racks 

angular.module('angularTheftAppApp')
    .constant('baseURL','http://localhost:8000/api/v1/racks/')
    .controller('MapCtrl', ['$scope', '$http', 'baseURL', function($scope, $http, baseURL) {

        $scope.map = { center: { latitude: 45.521570, longitude: -122.673371 }, zoom: 10 };
        $scope.markerBreakdown = [];

// ----------------------------------------------------------------------------------------------
        $scope.marker = {
          id: 0,
          coords: {
            latitude: 45.521570,
            longitude: -122.673371
          },
          options: { 
            draggable: true, 
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          },
          events: {
            dragend: function (marker) {
              console.log('marker dragend');
              $scope.lat = marker.getPosition().lat();
              $scope.lon = marker.getPosition().lng();
              console.log($scope.lat);
              console.log($scope.lon);

// *******************************************************************
// clear out bicycle rack array when marker is moved 

              $scope.markerBreakdown = [];

// *******************************************************************

              $scope.marker.options = {
                draggable: true,
                labelContent: 'lat: ' + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                labelAnchor: '100 0',
                labelClass: 'marker-labels',
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
              };
            }
          }
        };


// ----------------------------------------------------------------------------------------------
// search within 100 m of dragable markers location 
// need to add pull down menu to give user ability to change search distance 

        $scope.rackSearch = function() {
                $http.get(baseURL+'?dist=100&point='+$scope.lon+','+$scope.lat)
                .then(function(response) {
                    $scope.markers = response.data.results; 
                    // break up json object to format gmap can use with markers 
                    for (var i = 0; i < $scope.markers.length; i++) { 
                        var obj = {
                            id: $scope.markers[i].id, 
                            longitude: $scope.markers[i].geom.coordinates[0],
                            latitude: $scope.markers[i].geom.coordinates[1],
                            theftProb: $scope.markers[i].theft_prob_per_bike_day_x_1000
                        };

                        $scope.markerBreakdown.push(obj);
                    }
                    console.log($scope.markerBreakdown);
                });

            };

// ----------------------------------------------------------------------------------------------
        // work on moving url call to a factory service 
        // $scope.markers = rackFinder;

    

    }]);

