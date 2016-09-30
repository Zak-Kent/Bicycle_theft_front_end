'use strict';

/**
 * @ngdoc function
 * @name angularTheftAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTheftAppApp
 */

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! issues below !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

// add logic to respond with message saying no racks found within range
// have map return first 10 racs in above case with map fit to marker and racks 

angular.module('angularTheftAppApp')
    .constant('baseURL','http://localhost:8000/api/v1/racks/')

    .controller('MapCtrl', ['$scope', '$http','$window', 'baseURL', 'rackFactory', 'markerFactory', 'locationFactory', 
      function($scope, $http, $window, baseURL, rackFactory, markerFactory, locationFactory) {

        $scope.lat = 45.521570;
        $scope.lon = -122.673371;

        $scope.map = {center: {latitude: 45.521, longitude: -122.673}, zoom: 10};

        $scope.rackMarkers = [];
        $scope.distance = 50;

// ----------------------------------------------------------------------------------------------
// initialze scope lat and long to values
// need to change this to use user lat/long if possible 

        // first pass at grabbing user location 
        $window.navigator.geolocation.getCurrentPosition(function(position){
          console.log(position);
          var lati = position.coords.latitude;
          var longi = position.coords.longitude;

          // if user location inside usable area re-center map 
          if (locationFactory.locCheck(lati, longi)) {
            // watches the variables inside func and updates app if they change 
            $scope.$apply(function(){
              $scope.lat = lati;
              $scope.lon = longi; 
              $scope.map = {center: {latitude: $scope.lat, longitude: $scope.lon}, zoom: 15};
              $scope.marker.coords = {latitude: $scope.lat, longitude: $scope.lon};
            });

          } else {
            console.log('outside of usable area');
          }

        });
   
// ----------------------------------------------------------------------------------------------
        // using markerService to create search marker 

        var dragEvent = function(lat, lon){
          console.log('inside drag event');
          console.log(lat, lon);
          $scope.lat = lat;
          $scope.lon = lon;

          console.log($scope.lat, $scope.lon);
        };

        $scope.marker = markerFactory.createMarker($scope.lat, $scope.lon, dragEvent);


// ----------------------------------------------------------------------------------------------
        var httpHelp = function(url, racksObj, callback){
          // adds racks obj to array and then checks to see if there is more paginated data
          // if so recursively call the api until all data returned 
          $http.get(url).then(function(response){ 
            Array.prototype.push.apply(racksObj, response.data.results);
          
            if (response.data.next !== null) {
              httpHelp(response.data.next, racksObj, callback);
            } else {
              callback();
            }
          });
        };
          
// ----------------------------------------------------------------------------------------------
        $scope.rackSearch = function() {
                var url = baseURL+'?dist='+$scope.distance+'&point='+$scope.lon+','+$scope.lat;

                // clear out existing markers 
                $scope.rackMarkers = [];

                // create new object to hold markers in httpHelp function 
                $scope.markers = [];

                httpHelp(url, $scope.markers, function(){
                  // callback rackFactory sortRacks method to assign markers to racks based on theft score 
                  $scope.rackMarkers = rackFactory.sortRacks($scope.markers, $scope.marker);
                });
            };

// function to control search distance and 2 way data binding 
        $scope.distFunc = function(distSelect) {
          $scope.distance = distSelect;
        };
// ----------------------------------------------------------------------------------------------
    }]);