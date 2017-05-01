'use strict';

module.exports = {
  template: require('./manuscript-item.html'),
  controller: ['$log', 'manuscriptService', 'chapterService', ManuscriptItemController],
  controllerAs: 'manuscriptItemCtrl',
  bindings: {
    manuscript: '<',
    chapter: '<'
  }
};

function ManuscriptItemController($log, manuscriptService, chapterService) {
  $log.debug('ManuscriptItemController');

  this.changeEdit = {
    showEditManuscript: false
  };

  this.chapters = chapterService.allChapters;

  this.fetchChapters = function() {
    manuscriptService.fetchManuscripts()
    .then(manuscripts => {
      manuscripts.forEach(manuscript => {
        manuscript.chapters.forEach(chapter => {
          chapterService.allChapters.unshift(chapter);
        });
        $log.log('chapters retrieved');
      });
    })
    .catch(err => {
      $log.error(err.message);
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
