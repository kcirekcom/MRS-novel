'use strict';

module.exports = ['$q', '$log', '$http', 'authService', manuscriptService];

function manuscriptService($q, $log, $http, authService) {
  $log.debug('manuscriptService()');

  let service = {};
  service.manuscripts = [];

  service.createManuscript = function(manuscript) {
    $log.debug('manuscriptService.createManuscript()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, manuscript, config);
    })
    .then(res => {
      $log.log('user manuscript created');
      let manuscript = res.data;
      return manuscript;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchManuscripts = function() {
    $log.debug('manuscriptService.fetchUserManuscript()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then(res => {
      $log.log('manuscript retrieved');
      service.manuscripts = res.data;
      return service.manuscripts;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateManuscript = function(manuscriptID, manuscriptData) {
    $log.debug('manuscriptService.updateManuscript()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/manuscript/${manuscriptID}`; //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, manuscriptData, config);
    })
    .then(res => {
      for (let i = 0; i < service.manuscripts.length; i++) {
        let current = service.manuscripts[i];
        if (current._id === manuscriptID) {
          service.manuscripts[i] = res.data;
          break;
        }
      }

      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteManuscript = function(manuscriptID) {
    $log.debug('manuscriptService.deleteManuscript()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${manuscriptID}`; //eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then(() => {
      for (let i = 0; i < service.manuscripts.length; i++) {
        let current = service.manuscripts[i];
        if (current._id === manuscriptID) {
          service.manuscripts.splice(i, 1);
          break;
        }
      }
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
