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

// add search bar for users to search for a location on map 

angular.module('angularTheftAppApp')
    .constant('baseURL','http://localhost:8000/api/v1/racks/')

    .controller('MapCtrl', ['$scope', '$http', 'baseURL', function($scope, $http, baseURL) {

        $scope.map = { center: { latitude: 45.521570, longitude: -122.673371 }, zoom: 15 };
        $scope.markerBreakdown = [];
        $scope.distance = 50;

// ----------------------------------------------------------------------------------------------
// initialze scope lat and long to values of marker so that you can search from start without dragging
// need to change this to use user lat/long if possible 
        $scope.lat = 45.521570;
        $scope.lon = -122.673371;        

// ----------------------------------------------------------------------------------------------
        $scope.marker = {
          id: 0,
          coords: {
            latitude: $scope.lat,
            longitude: $scope.lon
          },
          options: { 
            draggable: true, 
            icon: '../../bower_components/map-icons/src/icons/bicycle-store.svg'
          },
          events: {
            dragend: function (marker) {
              console.log('marker dragend');
              $scope.lat = marker.getPosition().lat();
              $scope.lon = marker.getPosition().lng();

              // clear out bicycle rack array when marker is moved 
              $scope.markerBreakdown = [];

              $scope.marker.options = {
                draggable: true,
                labelContent: 'lat: ' + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                labelAnchor: '100 0',
                labelClass: 'marker-labels',
                icon: '../../bower_components/map-icons/src/icons/bicycle-store.svg',

              };
            }
          }
        };


// ----------------------------------------------------------------------------------------------
// search within 100 m of dragable markers location 
// need to add pull down menu to give user ability to change search distance 


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
                console.log(url);

                // clear out existing markers 
                $scope.markerBreakdown = [];

                // create new object to hold markers in httpHelp
                $scope.markers = [];

                httpHelp(url, $scope.markers, function(){
                  // callback function that sorts racks based on theft score and assigns colors to markers accordingly 
                  console.log('inside rackSearch');
                  console.log($scope.markers);

                  // sort theft scores from racks from lowest to highest  
                  $scope.markers.sort(function(a, b) {
                      return parseFloat(a.theft_prob_per_bike_day_x_1000) - parseFloat(b.theft_prob_per_bike_day_x_1000);
                  });

                  var colorArray = [
                    'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                    'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  ];
                  
                  for (var i = 0; i < $scope.markers.length; i++) { 

                      var colorIdx;
                      var colorSplit = $scope.markers.length / 3; 

                      if (i < colorSplit) {
                        colorIdx = 0;
                      } else if (i > colorSplit && i < colorSplit * 2) {
                        colorIdx = 1;
                      } else {
                        colorIdx = 2; 
                      }

                      // break up json object to format gmap can use with markers
                      var obj = {
                          id: $scope.markers[i].id, 
                          longitude: $scope.markers[i].geom.coordinates[0],
                          latitude: $scope.markers[i].geom.coordinates[1],
                          theftProb: $scope.markers[i].theft_prob_per_bike_day_x_1000,
                          markerOptions: {icon: colorArray[colorIdx]}

                      };
                      $scope.markerBreakdown.push(obj);
                  }

                });

                // add invisible marker to the list of racks where search location is so zoom fit includes search location 
                var markersetup = {
                  id: 0,
                  latitude: $scope.marker.coords.latitude,
                  longitude: $scope.marker.coords.longitude,
                  markerOptions: {visible: false}
                  };
                $scope.markerBreakdown.push(markersetup);
            };

// ----------------------------------------------------------------------------------------------
// function to control search distance and 2 way data binding 
        $scope.distFunc = function(distSelect) {

          $scope.distance = distSelect;
        };
// ----------------------------------------------------------------------------------------------
    }]);

