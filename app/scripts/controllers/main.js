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

// You don't need functions monitoring the map for changes!!!
// just grab the center and bounds and calculate the dist once the search button is pressed 

// ----------------------------------------------------------------------------------------------

    .controller('MapCtrl', ['$scope', '$http','$window', 'baseURL', 'myLocation', 
      'rackFactory', 'markerFactory', 'locationFactory', 'uiGmapIsReady', 'uiGmapGoogleMapApi', 
      function($scope, $http, $window, baseURL, myLocation, rackFactory, markerFactory, 
        locationFactory, uiGmapIsReady, uiGmapGoogleMapApi) {

        // needs these values to start up map on load. they get changed get location call below 
        $scope.map = {
          center: {
            latitude: 45.521, 
            longitude: -122.673
          }
        }; 

        $scope.rackMarkers = [];
        $scope.distance = 50;
        $scope.myCurrentLocation = {};

        myLocation.getCurrentLoc()
        .then(function(myCurrentLoc){
          console.log('myCurrentLoc', myCurrentLoc);
          $scope.myCurrentLoc = myCurrentLoc;
// ----------------------------------------------------------------------------------------------
          var lati = myCurrentLoc.latitude;
          var longi = myCurrentLoc.longitude;
            // if user location inside usable area re-center map 
          if (locationFactory.locCheck(lati,longi)) {
            // watches the variables inside func and updates app if they change 
              $scope.marker.coords = {latitude: lati, longitude: longi};
          } else {
            console.log('outside of usable area');
          }
        })
// ----------------------------------------------------------------------------------------------
        .then(function(){return uiGmapGoogleMapApi;})

        .then(function(maps){
          console.log('maps', maps);
          $scope.googlemap = {};
          $scope.map = {
              center: {        // set center on Portland 
                  latitude: 45.521, 
                  longitude: -122.673 
              },
              zoom: 13,
              pan: 1
              // options: myLocation.getMapOptions().mapOptions
          };
          $scope.map.center = $scope.myCurrentLoc;
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
          // this is where you need to grab bounds and center and find the seach dist maybe just left bound & right
          uiGmapIsReady.promise()
            .then(function(instances) {
              var mapObj = instances[0].map; 
              var bounds = mapObj.getBounds();

              // to get lat/long need to call center.lat()/.long()
              $scope.centerLat = mapObj.getCenter().lat();
              $scope.centerLon = mapObj.getCenter().lng();
              
              console.log(bounds.b.b);
              console.log(bounds.b.f);
              

              // make new lat/lng obj for right/left edge of map for dist search 
              var leftSide = new google.maps.LatLng($scope.centerLat, bounds.b.b);
              var rightSide = new google.maps.LatLng($scope.centerLat, bounds.b.f);

              $scope.mapDistance = google.maps.geometry.spherical.computeDistanceBetween(leftSide, rightSide);

              console.log('leftSide', leftSide.lng());

              console.log('distance between left & right of map')
              console.log($scope.mapDistance);
              console.log($scope.centerLat);
              console.log($scope.centerLon);

          });

          var url = baseURL+'?dist='+$scope.mapDistance+'&point='+$scope.centerLon+','+$scope.centerLat;

          console.log('url', url);

          // clear out existing markers 
          $scope.rackMarkers = [];

          // create new object to hold markers in httpHelp function 
          $scope.markers = [];

          httpHelp(url, $scope.markers, function(){
            // callback rackFactory sortRacks method to assign markers to racks based on theft score 
            $scope.rackMarkers = rackFactory.sortRacks($scope.markers, $scope.marker);
          });

        };
// ----------------------------------------------------------------------------------------------

// function to control search distance and 2 way data binding 
        $scope.distFunc = function(distSelect) {
          $scope.distance = distSelect;
        };

    }]);