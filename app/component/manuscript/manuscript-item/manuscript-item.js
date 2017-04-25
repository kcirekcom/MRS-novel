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

  this.deleteManuscript = function() {
    $log.debug('manuscriptItemCtrl.deleteManuscript()');
    manuscriptService.deleteManuscript(this.manuscript)
    .then(() => {
      $log.debug('manuscript deleted');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
