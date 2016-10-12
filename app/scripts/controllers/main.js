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
    .constant('baseURL','http://localhost:8000/api/v1/racks/sorted')

// You don't need functions monitoring the map for changes!!!
// just grab the center and bounds and calculate the dist once the search button is pressed 

// ----------------------------------------------------------------------------------------------

    .controller('MapCtrl', ['$scope', 'baseURL', 'mapServices', 'httpService',
      'markerFactory', 'uiGmapIsReady', 'uiGmapGoogleMapApi', 
      function($scope, baseURL, mapServices, httpService, markerFactory, uiGmapIsReady, uiGmapGoogleMapApi) {

        // needs these values to start up map on load. they get changed get location call below 
        $scope.map = {
          center: {
            latitude: 45.521, 
            longitude: -122.673
          }
        }; 
        $scope.rackMarkers = [];
// ----------------------------------------------------------------------------------------------
// map setup 

        mapServices.getCurrentLoc()
        .then(function(myCurrentLoc){
          console.log('myCurrentLoc', myCurrentLoc);
          $scope.myCurrentLoc = myCurrentLoc;
          var lati = myCurrentLoc.latitude;
          var longi = myCurrentLoc.longitude;
            // if user location inside usable area re-center map 
          if (mapServices.locationCheck(lati,longi)) {
            // watches the variables inside func and updates app if they change 
              $scope.marker.coords = {latitude: lati, longitude: longi};
          } else {
            console.log('outside of usable area');
          }
        })
        .then(function(){return uiGmapGoogleMapApi;})
        .then(function(maps){
          console.log('maps', maps);
          $scope.googlemap = {};
          $scope.map = {
              center: $scope.myCurrentLoc,
              zoom: 13,
              pan: 1,
              options: mapServices.getMapOptions().mapOptions
          };
        });

// ----------------------------------------------------------------------------------------------
        // using markerService to create search marker 

        // helper function used to manipulate scope outside of markerFactory 
        var dragEvent = function(lat, lng){
          console.log('inside drag event');
          console.log(lat, lng);
          $scope.lat = lat;
          $scope.lon = lng;

          $scope.marker.coords.latitude = lat;
          $scope.marker.coords.longitude = lng;

          // console.log($scope.lat, $scope.lng);
        };

        $scope.marker = markerFactory.createMarker($scope.lat, $scope.lon, dragEvent);
          
// ----------------------------------------------------------------------------------------------
        // needed to wrap this into nested promises to make sure distances and location were returned 
        // before get call. Otherwise you get undefined values in query string and map adjustment is one step behind. 
        $scope.rackSearch = function() {

          var lat = $scope.marker.coords.latitude;
          var lng = $scope.marker.coords.longitude;

          var url = baseURL+'?racks='+30+'&point='+lng+','+lat;

          httpService.httpHelp(url).then(function(results) {

            $scope.rackMarkers = markerFactory.sortRacks(results, $scope.marker);

          });

        };
// ----------------------------------------------------------------------------------------------

// function to control search distance and 2 way data binding 
        $scope.distFunc = function(distSelect) {
          $scope.distance = distSelect;
        };

    }]);