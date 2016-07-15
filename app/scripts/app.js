'use strict';

/**
 * @ngdoc overview
 * @name angularTheftAppApp
 * @description
 * # angularTheftAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularTheftAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'uiGmapgoogle-maps',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MapCtrl',
        controllerAs: 'maps'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
