/**
 * Created by garyzhou on 8/14/16.
 */
'use strict';

var mod = angular.module('api', []);

mod.factory('requestInviteService', ['$http', function($http) {
  var service = {};
  service.sendRequestInvite = function(name, email) {
    var payload = {
      name: name,
      email: email
    }
    return $http.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', payload);
  };
  return service;
}]);