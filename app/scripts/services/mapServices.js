'use strict';

angular.module('angularTheftAppApp')

// service that uses $q to return a promise to get user location 
.service('mapServices', ['$window', '$q', function($window, $q) {

  this.getMapOptions = function() {
    return {
      mapOptions : {
        minZoom : 3,
        zoomControl : true,
        draggable : true,
        navigationControl : false,
        mapTypeControl : false,
        scaleControl : false,
        streetViewControl : false,
        //mapTypeId : google.maps.MapTypeId.HYBRID,
        disableDoubleClickZoom : false,
        keyboardShortcuts : true,
        styles : [{
            featureType : "poi",
            elementType : "labels",
            stylers : [{
                visibility : "off"
            }]
        }, 
        {
          featureType : "transit",
          elementType : "all",
          stylers : [{
              visibility : "off"
          }]
        }],
      }
    };
  };

  this.locationCheck = function(lat, lng) {
    // min/max values found using valid data points from DB 
    var xMin = 122.472241;
    var xMax = 122.835418;
    var yMin = 45.431566;
    var yMax = 45.637628;

    var posLon = lng * -1;

    // check to see if point is inside user area 
    if (xMax >= posLon && posLon >= xMin && yMax >= lat && lat >= yMin){
      console.log('inisde the square');
      return true; 
    } else {
      console.log('outside the square');
      return false;    
    }
  };

  this.getCurrentLoc = function() {
    var deferred = $q.defer();
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      var myCurrentLoc = {
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude 
      };
      deferred.resolve(myCurrentLoc);
    });
    return deferred.promise; 
  };

  this.getMapDist = function(mapObj) {
    var deferred = $q.defer();

    var centerLat = mapObj.getCenter().lat();
    var boundsCoords = mapObj.getBounds();
    var leftSide = new google.maps.LatLng(centerLat, boundsCoords.b.b);
    var rightSide = new google.maps.LatLng(centerLat, boundsCoords.b.f);

    var distance = google.maps.geometry.spherical.computeDistanceBetween(leftSide, rightSide);

    var output = {
      center: {
        lat: centerLat,
        lng: mapObj.getCenter().lng()
      },
      distanceM: distance 
    };

    deferred.resolve(output);

    return deferred.promise;
  };

}]);

























