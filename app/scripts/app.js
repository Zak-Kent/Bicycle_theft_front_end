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
    'uiGmapgoogle-maps'
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
  // .config(function(uiGmapGoogleMapApiProvider) {
  //   uiGmapGoogleMapApiProvider.configure({
  //       key: 'AIzaSyAp0T-QkAiOsPQArJvVFnSEum42qvaEy_s',
  //       v: '3.20', //defaults to latest 3.X anyhow
  //       libraries: 'geometry'
  //   });

  // });

