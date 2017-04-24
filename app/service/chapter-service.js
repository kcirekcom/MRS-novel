'use strict';

module.exports = ['$q', '$log', '$http', 'authService', chapterService];

function chapterService($q, $log, $http, authService) {
  $log.debug('chapterService()');

  let service = {};
  service.allChapters = [];

  service.createChapter = (chapter) => {
    $log.debug('chapterService.createChapter()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/manuscript/${authService.currentManuscriptID}/chapter`; // eslint-disable-line

      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, chapter, config);
    })
    .then(res => {
      $log.log('chapter created');

      let chapter = res.data;
      service.allChapters.unshift(chapter);
      return chapter;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchChapters = function() {
    $log.debug('chapterService.fetchChapters');

    authService.getUserId();

    return authService.getManuscriptId()
    .then(() => {
      return authService.getToken();
    })
    .then(token => {
      let url = `${__API_URL__}/api/manuscript/${authService.currentManuscriptID}/chapter`; //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('user manuscripts retrieved');
      service.allChapters = res.data;
      return service.allChapters;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateChapter = (chapterData) => {
    $log.debug('chapterService.updateChapter()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/manuscript/${authService.currentManuscriptID}/chapter/${chapterData._id}`; // eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, chapterData, config);
    })
    .then(res => {
      for (let i = 0; i < service.allChapters.length; i++) {
        let current = service.allChapters[i];
        if (current._id === chapterData._id) {
          service.allChapters[i] = res.data;
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

  service.deleteChapter = function(chapterData) {
    $log.debug('chapterService.deletePost()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/manuscript/${authService.currentManuscriptID}/chapter/${chapterData._id}`; // eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then(res => { //eslint-disable-line
      for (let i = 0; i < service.allChapters.length; i++) {
        let current = service.allChapters[i];
        if (current._id === chapterData._id) {
          service.allChapters.splice(i, 1);
          break;
        }
      }
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchAllChaptersFromDB = function() {
    $log.debug('chapterService.fetchAllChaptersFromDB()');

    let url = `${__API_URL__}/api/chapters`; //eslint-disable-line
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return $http.get(url, config);
  };

  return service;
}
