'use strict';

module.exports = {
  template: require('./manuscript-item.html'),
  controller: ['$log', 'manuscriptService', ManuscriptItemController],
  controllerAs: 'manuscriptItemCtrl',
  bindings: {
    manuscript: '<',
    chapter: '<'
  }
};

function ManuscriptItemController($log, manuscriptService) {
  $log.debug('ManuscriptItemController');

  this.showEditManuscript = false;

  this.chapters = [];

  this.fetchChapters = function() {
    manuscriptService.fetchManuscripts()
    .then(manuscripts => {
      return manuscripts.reverse();
    })
    .then(manuscripts => {
      manuscripts.forEach(manuscript => {
        manuscript.chapters.forEach(chapter => {
          this.chapters.push(chapter);
        });
      });
      $log.log('chapters retrieved');
      return this.chapters.reverse();
    });
  };

  this.deleteManuscript = function() {
    $log.debug('manuscriptItemCtrl.deleteManuscript()');
    manuscriptService.deleteManuscript(this.manuscript)
    .then(() => {
      $log.log('manuscript deleted');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  this.fetchChapters();
}
