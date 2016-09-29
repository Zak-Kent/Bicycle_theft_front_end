'use strict';

angular.module('angularTheftAppApp')
.factory('markerFactory', [ function(){

        var markerFactory = {};

        markerFactory.createMarker = function($scope){
            var marker = {
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
                  $scope.rackMarkers = [];

                  $scope.marker.options = {
                    draggable: true,
                    // labelContent: 'lat: ' + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: '100 0',
                    labelClass: 'marker-labels',
                    icon: '../../bower_components/map-icons/src/icons/bicycle-store.svg',

                  };
                }
              }
            };
            return marker;

        };

    return markerFactory;
}]);



