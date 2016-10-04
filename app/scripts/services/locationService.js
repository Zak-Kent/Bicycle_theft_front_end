'use strict';

angular.module('angularTheftAppApp')
.factory('locationFactory', [ function(){
  var locationFactory = {};

  // min/max values found using valid data points from DB 
  var xMin = 122.472241;
  var xMax = 122.835418;
  var yMin = 45.431566;
  var yMax = 45.637628;

  locationFactory.locCheck = function(lat, lon){

    var posLon = lon * -1; 
    // check to see if point is inside user area 
    if (xMax >= posLon && posLon >= xMin && yMax >= lat && lat >= yMin){
      console.log('inisde the square');
      return true; 
    } else {
      console.log('outside the square');
      return false; 
      
    }
  };
  return locationFactory;
}])

// service that uses $q to return a promise to get user location 
.service('myLocation', ['$window', '$q', function($window, $q) {
    this.getMapOptions = function(){
      return {
        mapOptions : {
          minZoom : 3,
          zoomControl : false,
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

}]);