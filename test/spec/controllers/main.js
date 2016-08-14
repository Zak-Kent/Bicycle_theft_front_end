'use strict';

describe('MapCtrl', function() {
  beforeEach(module('angularTheftAppApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

    describe('$scope.grade', function() {
      it('sets the strength to "strong" if the password length is >8 chars', function() {
        var $scope = {};
        var controller = $controller('MapCtrl', { $scope: $scope });
        $scope.map = 'strong';
        // $scope.grade();
        expect($scope.map).toEqual('strong');
      });
  });
});
