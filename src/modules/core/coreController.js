/**
 * Created by garyzhou on 8/14/16.
 */
'use strict';

var mod = angular.module('core', []);
mod.controller('coreController', ['$scope', 'modalService', function($scope, modalService) {
  var vm = this;
  vm.openForm = function() {
    modalService.open();
  }
}]);
