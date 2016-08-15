/**
 * Created by garyzhou on 8/14/16.
 */
'use strict';

require('angular');
require('../inputModal/inputModalService');
require('../successModal/successModalService');

var mod = angular.module('requestInvitationApp', ['inputModal', 'successModal']);

mod.controller('coreController', ['$scope', 'inputModalService', 'successModalService',
  function($scope, inputModalService, successModalService) {
  var vm = this;
  vm.openForm = function() {
    var modalInstance = inputModalService.open();
    modalInstance.result.then(function(data) {
      $scope.result = data;
      successModalService.open();
    });
  }
}]);
