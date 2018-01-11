angular.module('portainer.services')
.factory('ExtensionManager', ['$q', 'PluginService', 'StoridgeManager', function ExtensionManagerFactory($q, PluginService, StoridgeManager) {
  'use strict';

  var service = {};

  service.init = function() {
    return $q.all(
      StoridgeManager.init()
    );
  };

  service.reset = function() {
    StoridgeManager.reset();
  };

  service.extensions = function() {
    var deferred = $q.defer();
    var extensions = [];

    PluginService.volumePlugins()
    .then(function success(data) {
      var volumePlugins = data;
      if (_.includes(volumePlugins, 'cio:latest')) {
        extensions.push('storidge');
      }
      deferred.resolve(extensions);
    })
    .catch(function error(err) {
      deferred.reject({ msg: 'Unable to retrieve extensions', err: err });
    });

    return deferred.promise;
  };

  return service;
}]);
