'use strict';

angular.module('angularTheftAppApp')
.factory('markerFactory', [ function(){

  var markerFactory = {};

  markerFactory.createMarker = function(lati, longi, aFunc){
    var marker = {
      id: 0,
      coords: {
        latitude: lati,
        longitude: longi
      },
      options: { 
        draggable: true, 
        icon: '../../bower_components/map-icons/src/icons/bicycle-store.svg'
      },
      events: {
        dragend: function (marker) {
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          aFunc(lat, lon);
        }
      }
    };
    return marker;
  };             
  return markerFactory;
}]);



