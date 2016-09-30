'use strict';

angular.module('angularTheftAppApp')
.factory('rackFactory', [ function(){
    var rackFactory = {};

    rackFactory.sortRacks = function (racks, marker) {
    // takes a list of sorted racks and assigns red, yellow, green markers to them based on theft score  
        racks.sort(function(a, b) {
          return parseFloat(a.theft_prob_per_bike_day_x_1000) - parseFloat(b.theft_prob_per_bike_day_x_1000);
          });

        var sortedRacks = [];

        var colorArray = [
            'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          ];

        for (var i = 0; i < racks.length; i++) { 
            var colorIdx;
            var colorSplit = racks.length / 3; 

            if (i < colorSplit) {
            colorIdx = 0;
            } else if (i > colorSplit && i < colorSplit * 2) {
            colorIdx = 1;
            } else {
            colorIdx = 2; 
            }

            // break up json object to format gmap can use with markers
            var obj = {
              id: racks[i].id, 
              longitude: racks[i].geom.coordinates[0],
              latitude: racks[i].geom.coordinates[1],
              theftProb: racks[i].theft_prob_per_bike_day_x_1000,
              markerOptions: {icon: colorArray[colorIdx]}

            };
            sortedRacks.push(obj);
        }
        // add invisible marker to the list of racks where search location is so zoom fit includes search location
        var markersetup = {
                  id: 0,
                  latitude: marker.coords.latitude,
                  longitude: marker.coords.longitude,
                  markerOptions: {visible: false}
                  };
        sortedRacks.push(markersetup);

        return sortedRacks;
    };

    return rackFactory;
}]);

