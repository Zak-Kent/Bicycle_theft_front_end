'use strict';

angular.module('angularTheftAppApp')
.factory('rackFinder', ['$http', 'baseURL', function($http, baseURL){

    var bicycleParking = [];

    bicycleParking.getBicycleParking = function(dist, lon, lat) {
        $http.get(baseURL+'?dist='+dist+'&point='+lon+','+lat)
        .then(function(response) {
            var markers = response.data.results; 
            // break up json object to format gmap can use with markers 
            for (var i = 0; i < markers.length; i++) { 
                var obj = {
                    id: markers[i].id, 
                    longitude: markers[i].geom.coordinates[0],
                    latitude: markers[i].geom.coordinates[1],
                    theftProb: markers[i].theft_prob_per_bike_day_x_1000
                };

                bicycleParking.push(obj);
            }
            console.log('inside rack finder');
            console.log(bicycleParking);

        });
    };
    return bicycleParking;
    





    // $http.get(baseURL+'?dist=100&point=-122.678713,45.514798')
    // .then(function(response) {
    //     var markers = response.data.results; 

    //     console.log(markers);
    //     console.log(markers.length);

    //     var markerBreakdown = [];

    //     // break up json object to format gmap can use with markers 
    //     for (var i = 0; i < markers.length; i++) { 
    //         var obj = {id: markers[i].id, 
    //                 longitude: markers[i].geom.coordinates[0],
    //                 latitude: markers[i].geom.coordinates[1]};

    //         markerBreakdown.push(obj);
    //     }
    // });

}]);

