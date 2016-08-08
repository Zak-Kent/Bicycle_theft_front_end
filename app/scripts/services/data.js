'use strict';

angular.module('angularTheftAppApp')
.factory('rackFinder', ['$http', 'baseURL', function($http, baseURL){

    $http.get(baseURL+'?dist=100&point=-122.678713,45.514798')
    .then(function(response) {
        var markers = response.data.results; 

        console.log(markers);
        console.log(markers.length);

        var markerBreakdown = [];

        // break up json object to format gmap can use with markers 
        for (var i = 0; i < markers.length; i++) { 
            var obj = {id: markers[i].id, 
                    longitude: markers[i].geom.coordinates[0],
                    latitude: markers[i].geom.coordinates[1]};

            markerBreakdown.push(obj);
        }
    });

}]);

