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

    .controller('MapCtrl', ['$scope', '$http','$window', 'baseURL', 
      'rackFactory', 'markerFactory', 'locationFactory', 'uiGmapIsReady', 'uiGmapGoogleMapApi', 
      function($scope, $http, $window, baseURL, rackFactory, markerFactory, locationFactory, uiGmapIsReady, uiGmapGoogleMapApi) {

        // leaving these out has marker only appear on zoom user location 
        // $scope.lat = 45.521570;
        // $scope.lon = -122.673371;

          $scope.map = {
            center: {
              latitude: 45.521, 
              longitude: -122.673
            }, 
            zoom: 10,
            control: {},
            events: {}

          };

        $scope.rackMarkers = [];
        $scope.distance = 50;

// ----------------------------------------------------------------------------------------------
        uiGmapGoogleMapApi.then(function(maps) {
          console.log('kajdhkajhdg;khjad;g');
          $scope.map = {
            center: {
              latitude: 45.521, 
              longitude: -122.673
            }, 
            zoom: 10,
            control: {}, 
            events: {
              tilesloaded: function(maps) {
                console.log(maps);
              },
              dragend: function(maps) {
                console.log('askdjf;asdjsalkfj');
              }
            }
          };  



        });

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
              $scope.map = {control: {}, center: {latitude: $scope.lat, longitude: $scope.lon}, zoom: 15};
              $scope.marker.coords = {latitude: $scope.lat, longitude: $scope.lon};
            });

          } else {
            console.log('outside of usable area');
          }

        });
   
// ----------------------------------------------------------------------------------------------
// calculate the radius of the map that is currently visable to search with this dist 
      // $scope.map = {
      //   center: {latitude: $scope.lat, longitude: $scope.lon}, 
      //   zoom: 15,
      //   events: {
      //     tilesloaded: function (map) {
      //       $scope.$apply(function (){
      //         console.log("this is map instance");
      //         var test = map.getBounds();
      //         console.log(test);
      //       });
      //     }
      //   }
      // };
      uiGmapIsReady.promise()
      .then(function(instances) {
        var testMap = instances[0].map; 
        console.log("test map");
        console.log(testMap);
      // var test = $scope.map.control.getGMap()
      // console.log(test);
      });




// ----------------------------------------------------------------------------------------------
        // using markerService to create search marker 

        // helper function used to manipulate scope outside of markerFactory 
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