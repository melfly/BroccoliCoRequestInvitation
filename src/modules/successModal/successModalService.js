/**
 * Created by garyzhou on 8/15/16.
 */
"use strict";

require('angular-ui-bootstrap');
var mod = angular.module('successModal', ['ui.bootstrap']);

mod.factory('successModalService', ['$uibModal', function($uibModal) {
  var modalService = {};
  modalService.open = function() {
    return $uibModal.open({
      template: require('./successModal.html'),
      controller: function($scope, $uibModalInstance) {
        var vm = this;
        vm.close = function() {
          $uibModalInstance.close('ok');
        }
      },
      controllerAs: 'ctrl',
      size: 'sm'
    });
  }

  return modalService;

}]);

