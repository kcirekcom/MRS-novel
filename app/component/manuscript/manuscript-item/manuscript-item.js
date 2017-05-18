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

  this.changeEdit = {
    showEditManuscript: false
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
}
