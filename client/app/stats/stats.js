'use strict';

angular.module('shadoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats',
        templateUrl: 'app/stats/stats.html',
        controller: 'MainCtrl'
      });
  });