'use strict';

angular.module('angularTheftAppApp')
.factory('locationFactory', [ function(){
  var locationFactory = {};

  // min/max values found using valid data points from DB 
  var xMin = 122.472241;
  var xMax = 122.835418;
  var yMin = 45.431566;
  var yMax = 45.637628;

  locationFactory.locCheck = function(lat, longi){

    var longi = longi * -1; 
    // check to see if point is inside user area 
    if (xMax >= longi && longi >= xMin && yMax >= lat && lat >= yMin){
      console.log("inisde the square");
      return true; 
    } else {
      console.log("outside the square");
      return false; 
      
    }
  };
  return locationFactory;
}]);