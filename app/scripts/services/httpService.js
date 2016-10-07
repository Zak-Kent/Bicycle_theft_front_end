'use strict';

angular.module('angularTheftAppApp')

.service('httpService', ['$http', '$q', function($http, $q){
  this.httpHelp = function(url){
    var deferred = $q.defer();

    var output = []; 

    // adds racks obj to array and then checks to see if there is more paginated data
    // if so recursively call the api until all data returned
    var httpRecurse = function(url, output){
        
      $http.get(url).then(function(response){ 
        Array.prototype.push.apply(output, response.data.results);

        if (response.data.next !== null) {
          httpRecurse(response.data.next, output);
        } else {
          deferred.resolve(output);
        }
      });
    };

    // need to call inside recursive function to start it off  
    httpRecurse(url, output);

  return deferred.promise;
};


}]);