'use strict';

angular.module('angularTheftAppApp')
.factory('rackFinder', function($resource){
    return $resource('http://localhost:8000/api/v1/racks/?dist=200&point=-122.678713,45.514798');

});

// below is command that looks at local resource for rack data. maybe use in testing 
// return $resource('json_data/json_data.json');