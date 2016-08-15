/**
 * Created by garyzhou on 8/14/16.
 */

"use strict";

require('angular-ui-bootstrap');
require('../api/requestInviteService');
var mod = angular.module('inputModal', ['ui.bootstrap', 'api']);
require('./compareToDirective');

mod.factory('inputModalService', ['$uibModal', function($uibModal) {
  var modalService = {};
  modalService.open = function() {
    return $uibModal.open({
      template: require('./inputModal.html'),
      controller: 'modalController as ctrl'
    });
  }
  return modalService;
}]);

mod.controller('modalController', ['$scope', '$uibModalInstance', 'requestInviteService',
  function($scope, $uibModalInstance, requestInviteService) {
  var vm = this;
    $scope.submitted = false;
  vm.send = function() {
    $scope.submitted = true;
    if ($scope.inputForm.$valid) {
      //send the input and close the modal
      $scope.inProgress = true;
      $scope.serverError = null;
      requestInviteService.sendRequestInvite($scope.fullName, $scope.email).then(function(response){
        $uibModalInstance.close(response);
      }, function(error){
        $scope.serverError = error;
      }).finally(function() {
        $scope.inProgress = false;
      })
    }
  }
}]);

