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

// ----------------------------------------------------------------------------------------------
        // $scope.$watch($scope.map.mapControl, function(){ 
        //   var gmap = $scope.map.mapControl.getGMap();
        // });
        $scope.mapControl = {};


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
                icon: '../../bower_components/map-icons/src/icons/bicycle-store.svg',

              };
            }
          }
        };

// ----------------------------------------------------------------------------------------------
// need to figure out asyncronus stuff with this factory call and how to return object to controller 

      // var racksTest = rackFinder.getBicycleParking(100, $scope.lon, $scope.lat);
      // console.log('racktest start');
      // console.log(racksTest); 
      // console.log('racktest end');

      // $scope.testCtrl = function($scope, rackFinder){
      //   $scope.markerBreakdown = function() {
      //     rackFinder.getBicycleParking(100, $scope.lon, $scope.lat);
      //   };
      // }



// ----------------------------------------------------------------------------------------------
// search within 100 m of dragable markers location 
// need to add pull down menu to give user ability to change search distance 

        $scope.rackSearch = function() {
                $http.get(baseURL+'?dist=1000&point='+$scope.lon+','+$scope.lat)
                .then(function(response) {
                    $scope.markers = response.data.results; 

                    // sort theft scores from racks from lowest to highest  
                    $scope.markers.sort(function(a, b) {
                        return parseFloat(a.theft_prob_per_bike_day_x_1000) - parseFloat(b.theft_prob_per_bike_day_x_1000);
                    });

                    // replace array with references to different colored icons 
                    // var colorArray = ['A', 'B', 'C'];

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
                        console.log(colorIdx);

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
                    console.log($scope.markerBreakdown);
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
        // work on moving url call to a factory service 
        // $scope.markers = rackFinder;

// ----------------------------------------------------------------------------------------------
    //create empty LatLngBounds object



// ----------------------------------------------------------------------------------------------


    }]);

