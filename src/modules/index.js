/**
 * Created by garyzhou on 8/11/16.
 */
'use strict'

require('angular');
var mod = angular.module('requestInvitationApp', []);
console.log('initializing angular');
mod.controller('testController', ['$scope', function($scope) {
  $scope.text = 'This is from angular';
}]);