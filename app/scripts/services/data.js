'use strict';

angular.module('angularTheftAppApp')
.service('dataService', function($http) {
    this.markers = function(callback) {
        $http.get('http://localhost:8000/api/v1/racks/?dist=100&point=-122.678713,45.514798')
        .then(callback);
    };
});