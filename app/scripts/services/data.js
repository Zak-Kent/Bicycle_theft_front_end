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


        //     var httpHelp = function(url) {
        //   $http.get(url).then(function(response){
        //     console.log('inside httpHelp');
        //     console.log(response.data);

        //     return response.data; 
        //   });
        // };



// ----------------------------------------------------------------------------------------------
        // $scope.rackSearch = function() {
        //         $http.get(baseURL+'?dist=1000&point='+$scope.lon+','+$scope.lat)
        //         .then(function(response) {
        //             $scope.markers = response.data.results;
        //             console.log('looking for next'); 
        //             console.log(response.data.next); 

        //             if (response.data.next !== null) {


        //               // $scope.markers.concat()
        //             } 

        //             // sort theft scores from racks from lowest to highest  
        //             $scope.markers.sort(function(a, b) {
        //                 return parseFloat(a.theft_prob_per_bike_day_x_1000) - parseFloat(b.theft_prob_per_bike_day_x_1000);
        //             });

        //             // replace array with references to different colored icons 
        //             // var colorArray = ['A', 'B', 'C'];

        //             var colorArray = [
        //               'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        //               'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        //               'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        //             ];

                    
        //             for (var i = 0; i < $scope.markers.length; i++) { 

        //                 var colorIdx;
        //                 var colorSplit = $scope.markers.length / 3; 

        //                 if (i < colorSplit) {
        //                   colorIdx = 0;
        //                 } else if (i > colorSplit && i < colorSplit * 2) {
        //                   colorIdx = 1;
        //                 } else {
        //                   colorIdx = 2; 
        //                 }
        //                 console.log(colorIdx);

        //                 // break up json object to format gmap can use with markers
        //                 var obj = {
        //                     id: $scope.markers[i].id, 
        //                     longitude: $scope.markers[i].geom.coordinates[0],
        //                     latitude: $scope.markers[i].geom.coordinates[1],
        //                     theftProb: $scope.markers[i].theft_prob_per_bike_day_x_1000,
        //                     markerOptions: {icon: colorArray[colorIdx]}

        //                 };
        //                 $scope.markerBreakdown.push(obj);
        //             }
        //             console.log($scope.markerBreakdown);
        //         });

        //         // add invisible marker to the list of racks where search location is so zoom fit includes search location 
        //         var markersetup = {
        //           id: 0,
        //           latitude: $scope.marker.coords.latitude,
        //           longitude: $scope.marker.coords.longitude,
        //           markerOptions: {visible: false}
        //           };
        //         $scope.markerBreakdown.push(markersetup);
        //     };
    





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

