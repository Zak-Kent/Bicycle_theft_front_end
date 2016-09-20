'use strict';

angular.module('angularTheftAppApp')
.factory('rackFinder', ['$http', 'baseURL', function($http, baseURL){

//     // ----------------------------------------------------------------------------------------------
//     var httpHelp = function(url, racksObj, callback){
//       // adds racks obj to array and then checks to see if there is more paginated data
//       // if so recursively call the api until all data returned 
//       $http.get(url).then(function(response){ 
//         Array.prototype.push.apply(racksObj, response.data.results);
      
//         if (response.data.next !== null) {
//           httpHelp(response.data.next, racksObj, callback);
//         } else {
//           callback();
//         }
//       });
//     };
      
// // ----------------------------------------------------------------------------------------------
//     return { 
//         rackSearch: function(baseURL, distance, lon, lat) {
//             // var url = baseURL+'?dist='distance+'&point='lon+','+lat;
//             console.log(baseUrl);

//             // clear out existing markers 
//             var markerBreakdown = [];

//             // create new object to hold markers in httpHelp
//             var markers = [];

//             httpHelp(baseUrl, markers, function(){
//               // callback function that sorts racks based on theft score and assigns colors to markers accordingly 
//               console.log('inside rackSearch');
//               console.log(markers);

//               // sort theft scores from racks from lowest to highest  
//               markers.sort(function(a, b) {
//                   return parseFloat(a.theft_prob_per_bike_day_x_1000) - parseFloat(b.theft_prob_per_bike_day_x_1000);
//               });

//               var colorArray = [
//                 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
//                 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
//                 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//               ];
              
//               for (var i = 0; i < markers.length; i++) { 

//                   var colorIdx;
//                   var colorSplit = markers.length / 3; 

//                   if (i < colorSplit) {
//                     colorIdx = 0;
//                   } else if (i > colorSplit && i < colorSplit * 2) {
//                     colorIdx = 1;
//                   } else {
//                     colorIdx = 2; 
//                   }

//                   // break up json object to format gmap can use with markers
//                   var obj = {
//                       id: markers[i].id, 
//                       longitude: markers[i].geom.coordinates[0],
//                       latitude: markers[i].geom.coordinates[1],
//                       theftProb: markers[i].theft_prob_per_bike_day_x_1000,
//                       markerOptions: {icon: colorArray[colorIdx]}

//                   };
//                   markerBreakdown.push(obj);
//               }

//             });
//         console.log(markerBreakdown);

            // add invisible marker to the list of racks where search location is so zoom fit includes search location 
        //     var markersetup = {
        //       id: 0,
        //       latitude: $scope.marker.coords.latitude,
        //       longitude: $scope.marker.coords.longitude,
        //       markerOptions: {visible: false}
        //       };
        //     markerBreakdown.push(markersetup);
        // };
        // }
    // };

}]);

