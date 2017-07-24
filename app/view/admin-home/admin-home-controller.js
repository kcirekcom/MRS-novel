'use strict';

module.exports = ['$log', '$rootScope', 'manuscriptService', AdminHomeController];

function AdminHomeController($log, $rootScope, manuscriptService) {
  $log.debug('AdminHomeController');

  this.loader = {
    loading: true,
  };

  this.manuscripts = manuscriptService.manuscripts;

  this.fetchManuscripts = function() {
    manuscriptService.fetchManuscripts()
    .then(manuscripts => {
      manuscripts.forEach(manuscript => {
        manuscriptService.manuscripts.unshift(manuscript);
      });
      this.currentManuscript = manuscripts[0];
      this.loader.loading = false;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  this.manuscriptDeleteDone = function(manuscript) {
    if (this.currentManuscript._id === manuscript._id) {
      this.currentManuscript = null;
    }
  };

  this.fetchManuscripts();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchManuscripts();
  });
}
