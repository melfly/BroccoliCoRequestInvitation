/**
 * Created by garyzhou on 8/14/16.
 */

"use strict";

require('angular-ui-bootstrap');
var mod = angular.module('modal', ['ui.bootstrap']);

mod.factory('modalService', ['$uibModal', function($uibModal) {
  var modalService = {};
  var modalInstance = modalService.open = function() {
    $uibModal.open({
      template: require('./modalForm.html'),
      controller: 'modalController as ctrl'
    });
  }

  return modalService;

}]);

mod.controller('modalController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
  var vm = this;
  vm.send = function() {
    if ($scope.inputForm.$valid) {
      //send the input and close the modal
      $uibModalInstance.close('cancel');
    }
  }
}]);


